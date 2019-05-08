import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, forkJoin } from 'rxjs';
import { ConstructorsService } from '../../services/constructors/constructors.service';
import { Driver } from 'src/app/services/utils';
import { Color, Label, monkeyPatchChartJsLegend } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

@Component({
  selector: 'app-constructor-detail',
  templateUrl: './constructor-detail.component.html',
  styleUrls: ['./constructor-detail.component.scss']
})
export class ConstructorDetailComponent implements OnInit, AfterViewInit {

  nationality: Observable<string>;
  parametro: string;
  selectedConstructor: Observable<any>;

  constructorDrivers: Observable<any>;

  winsCount: Observable<any>;
  winPercentage: Observable<any>;

  racesCount: Observable<any>;

  polesCount: Observable<any>;
  polesPercentage: Observable<any>;

  seasonCount: Observable<any>;

  driverChampionshipsCount: Observable<any>;
  driverChampionshipPercentage: Observable<any>;

  constructorChampionshipsCount: Observable<any>;
  constructorChampionshipsPercentage: Observable<any>;

  constructorImage: Observable<any>;
  constructorInfo: Observable<any>;

  public lineChartData: ChartDataSets[] = [
    { data: [4, 5, 2, 1, 1], label: 'Resultados del equipo', fill: false },
  ];
  public lineChartLabels: Label[] = ['2011', '2012', '2013', '2014', '2015'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    responsiveAnimationDuration: 1000,
    legend: {
      fullWidth: true,
      labels: {
        fontSize: 20,
        fontFamily: 'F1-Regular',
        fontColor: '#000'
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 25
      }
    },
    title: {
      text: 'RESULTADOS DEL CAMPEONATO DE CONSTRUCTORES POR TEMPORADA',
      display: true,
      fontSize: 30,
      fontFamily: 'F1-Bold',
      fontColor: '#000',
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temporadas',
          fontSize: 20,
          fontFamily: 'F1-Regular',
          fontColor: '#000'
        },
        ticks: {
          fontSize: 15,
          maxRotation: 90,
          minRotation: 50,
          padding: 5,
          fontColor: '#000',
        },
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Puesto en el campeontao',
            fontSize: 20,
            fontFamily: 'F1-Regular',
            fontColor: '#000'
          },
          ticks: {
            reverse: true,
            autoSkip: true,
            callback: function (value, index, values) {
              return value + 'º';
            },
            stepSize: 1,
            fontSize: 15,
            fontColor: '#000'
          },
          position: 'left',
        },
      ]
    }
  };

  public mobilelineChartOptions: (ChartOptions) = {
    responsive: true,
    responsiveAnimationDuration: 1000,
    legend: {
      fullWidth: true,
      labels: {
        fontSize: 20,
        fontFamily: 'F1-Regular',
        fontColor: '#000',
        boxWidth: 15,
        fontStyle: 'center',
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 10,
        bottom: 25
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temporadas',
          fontSize: 20,
          fontFamily: 'F1-Regular',
          fontColor: '#000'
        },
        ticks: {
          fontSize: 15,
          maxRotation: 90,
          minRotation: 50,
          padding: 5,
          fontColor: '#000',
        },
      }],
      yAxes: [
        {
          ticks: {
            reverse: true,
            autoSkip: true,
            callback: function (value, index, values) {
              return value + 'º';
            },
            stepSize: 1,
            fontSize: 15,
            fontColor: '#000'
          },
          position: 'left',
        },
      ]
    }
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#F17F42',
      pointBackgroundColor: '#000',
      pointBorderColor: '#fff',

    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private route: ActivatedRoute, private constructorsService: ConstructorsService,
    private deviceService: DeviceDetectorService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = 800;
    canvas.height = 300;
    if (this.deviceService.isMobile()) {
      this.lineChartOptions = this.mobilelineChartOptions;
      canvas.height = 900;
    }
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.nationality = this.constructorsService.getNationalityByConstructorID(this.parametro);
    this.selectedConstructor = this.constructorsService.getConstructorByID(this.parametro);
    this.constructorDrivers = this.constructorsService.getCurrentDriversByConstructorID(this.parametro);
    this.winsCount = this.constructorsService.getVictoriesCountByConstructorID(this.parametro);
    this.winPercentage = this.getWinPercentage();
    this.racesCount = this.constructorsService.getRacesCountByConstructorID(this.parametro);
    this.polesCount = this.constructorsService.getPolesCountByConstructorID(this.parametro);
    this.polesPercentage = this.getPolePercentage();

    this.seasonCount = this.constructorsService.getSeasonCountByConstructorID(this.parametro);
    this.driverChampionshipsCount = this.constructorsService.getDriverChampionshipsCountByConstructorID(this.parametro);
    this.driverChampionshipPercentage = this.getDriverChampionshipPercentage();
    this.constructorChampionshipsCount = this.constructorsService.getConstructorChampionshipsCountByConstructorID(this.parametro);
    this.constructorChampionshipsPercentage = this.getConstructorChampionshipsPercentage();


    this.selectedConstructor.subscribe(res => {
      this.constructorImage = this.constructorsService.getConstructorImage(res);
      this.constructorInfo = this.constructorsService.getConstructorInfo(res);
    });

    this.constructorsService.getSeasonsResults(this.parametro)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.lineChartData[0].data = res.results;
          this.lineChartLabels = res.seasons;
          this.spinner.hide();
          enableBodyScroll();
        } else {
          this.spinner.hide();
          enableBodyScroll();
        }
      });
  }

  ngAfterViewInit() {
    this.spinner.show();
    disableBodyScroll();
  }

  getWinPercentage() {
    const percentage = new Subject();
    this.winsCount.subscribe(winsCount => {
      this.racesCount.subscribe(racesCount => {
        percentage.next(Math.round((winsCount * 100) / racesCount));
      });
    });
    return percentage.asObservable();
  }

  getPolePercentage() {
    const percentage = new Subject();
    this.polesCount.subscribe(polesCount => {
      this.racesCount.subscribe(racesCount => {
        percentage.next(Math.round((polesCount * 100) / racesCount));
      });
    });
    return percentage.asObservable();
  }

  getDriverChampionshipPercentage() {
    const percentage = new Subject();
    this.seasonCount.subscribe(seasonCount => {
      this.driverChampionshipsCount.subscribe(dcCount => {
        percentage.next(Math.round((dcCount * 100) / seasonCount));
      });
    });
    return percentage.asObservable();
  }

  getConstructorChampionshipsPercentage() {
    const percentage = new Subject();
    this.seasonCount.subscribe(seasonCount => {
      this.constructorChampionshipsCount.subscribe(ccCount => {
        percentage.next(Math.round((ccCount * 100) / seasonCount));
      });
    });
    return percentage.asObservable();
  }
}
