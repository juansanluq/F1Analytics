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
import { mapFinishingPositions, setChartOptions, setMobileChartOptions } from 'src/core/utils';

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

  finishingPositions: Observable<any>;
  drivers: Observable<any>;

  driversChampionships: Observable<any>;
  constructorsChampionships: Observable<any>;
  wins: Observable<any>;

  /*
  *   Variables para el control de la vista
  */
  seasonData = false;
  finishingPositionsData = false;
  gridPositionsData = false;
  dcData = false;
  ccData = false;
  winsData = false;


  /*
  *   Configuración de las gráficas
  */

  /* SEASON CHART */
  public seasonChartData: ChartDataSets[] = [
    { data: [], label: 'Resultados del equipo', fill: false },
  ];
  public seasonChartOptions: (ChartOptions) = setChartOptions('RESULTADOS DEL CAMPEONATO DE CONSTRUCTORES', 'Temporadas', 'Puesto', 1, true, true);
  public mSeasonChartOptions: (ChartOptions) = setMobileChartOptions(1, true, true);
  public seasonChartLabels: Label[] = [];
  public seasonChartColors: Color[] = [
    { // grey
      backgroundColor: '#000',
      borderColor: '#F17F42',
      pointBackgroundColor: '#000',
      pointBorderColor: '#fff',

    }
  ];
  /* END SEASON CHART */

  /* FINISHING POSITIONS CHART */
  public fPositionsChartData: ChartDataSets[] = [
    { data: [], label: 'Resultados del equipo', fill: false },
  ];
  public fPositionsChartOptions: (ChartOptions) = setChartOptions('POSICIONES FINALES EN CARRERA', 'Puesto', 'Nº de veces', 10, false, 'º');
  public mFPositionsChartOptions: (ChartOptions) = setMobileChartOptions(10, false, false);
  public fPositionsChartLabels: Label[] = [];
  public fPositionsChartColors: Color[] = [{
    backgroundColor: '#F17F42',
  }];
  /* END FINISHING POSITIONS CHART */


  /* GRID POSITIONS CHART */
  public gPositionsChartData: ChartDataSets[] = [
    { data: [], label: 'Posición de salida', fill: false },
  ];
  public gPositionsChartOptions: (ChartOptions) = setChartOptions('POSICIONES DE PARRILLA', 'Puesto', 'Nº de veces', 10, false, 'º');
  public mGPositionsChartOptions: (ChartOptions) = setMobileChartOptions(10, false, false);
  public gPositionsChartLabels: Label[] = [];
  public gPositionsChartColors: Color[] = [{
    backgroundColor: '#F17F42',
  }];
  /* END GRID POSITIONS CHART */

  constructor(private route: ActivatedRoute, private constructorsService: ConstructorsService,
    private deviceService: DeviceDetectorService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    window.onbeforeunload = function () { window.scrollTo(0, 0); }
    this.resizeCharts(800, 100, 900);

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
          this.seasonChartData[0].data = res.results;
          this.seasonChartLabels = res.seasons;
          this.spinner.hide();
          enableBodyScroll();
          this.seasonData = true;
        } else {
          this.spinner.hide();
          enableBodyScroll();
        }
      });

    this.finishingPositions = this.constructorsService.getFinishingPositions(this.parametro);
    this.finishingPositions.subscribe(data => {
      this.fPositionsChartData[0].data = data.fp[1];
      this.fPositionsChartLabels = data.fp[0];
      this.finishingPositionsData = true;
      this.gPositionsChartData[0].data = data.gp[1];
      this.gPositionsChartLabels = data.gp[0];
      this.gridPositionsData = true;
    });

    this.drivers = this.constructorsService.getDrivers(this.parametro);
    this.driversChampionships = this.constructorsService.getDriversChamp(this.parametro);
    this.constructorsChampionships = this.constructorsService.getConstructorsChamp(this.parametro);

    this.driversChampionships.subscribe(data => {
      if (data.length > 0) {
        this.dcData = true;
      };
    });
    this.constructorsChampionships.subscribe(data => {
      if (data.legth > 0) {
        this.ccData = true;
      }
    });
    this.wins = this.constructorsService.getWins(this.parametro);
    this.wins.subscribe(data => {
      if (data.length > 0) {
        this.winsData = true;
      }
    })


  }

  ngAfterViewInit() {
    //TODO Descomentar para activar el spinner de carga
    // this.spinner.show();
    // disableBodyScroll();
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

  resizeCharts(width, height, mobileheight) {
    let canvasArray = document.getElementsByTagName('canvas');
    let lenght = canvasArray.length;
    for (let i = 0; i < lenght; i++) {
      canvasArray.item(i).width = width;
      canvasArray.item(i).height = height;
    }
    if (this.deviceService.isMobile()) {
      this.seasonChartOptions = this.mSeasonChartOptions;
      this.fPositionsChartOptions = this.mFPositionsChartOptions;
      /* Cambiamos el label para el eje X */
      this.fPositionsChartOptions.scales.xAxes[0].scaleLabel.labelString = 'Puesto';
      this.gPositionsChartOptions = this.mGPositionsChartOptions;
      this.gPositionsChartOptions.scales.xAxes[0].scaleLabel.labelString = 'Puesto';

      for (let i = 0; i < lenght; i++) {
        canvasArray.item(i).height = mobileheight;
      }
      // canvasArray.height = mobileheight;
    }
  }
}
