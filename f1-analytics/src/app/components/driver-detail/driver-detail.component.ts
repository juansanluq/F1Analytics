import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from '../../services/drivers/drivers.service';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { setChartOptions, setMobileChartOptions } from 'src/core/utils';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent implements OnInit, OnDestroy {

  paramSubscription: any;
  parametro;
  driverSelected: Observable<any>;
  driverImage: Observable<any>;
  driverInfo: Observable<any>;
  stats: Observable<any>;
  statsReady = false;
  mobile = false;

  seasonsResults: Observable<any>;
  seasonData = false;

  fpResults: Observable<any>;
  fpData = false;

  gpResults: Observable<any>;
  gpData = false;

  wins: Observable<any>;
  winsData = false;

  poles: Observable<any>;
  polesData = false;

  teamMates: Observable<any>;
  teamMatesData = false;


  public seasonChartData: ChartDataSets[] = [
    { data: [], label: 'Resultados por temporada', fill: false },
  ];
  public seasonChartLabels: Label[] = [];
  public seasonChartOptions: (ChartOptions) = setChartOptions('RESULTADOS DEL CAMPEONATO DE PILOTOS', 'Temporadas', 'Puesto', 1, true, true, 0);
  public mSeasonChartOptions: (ChartOptions) = setMobileChartOptions(3, true, true, 0);
  public seasonChartColors: Color[] = [
    { // grey
      backgroundColor: '#000',
      borderColor: '#F17F42',
      pointBackgroundColor: '#000',
      pointBorderColor: '#fff',

    }
  ];


  /* FINISHING POSITIONS CHART */
  public fPositionsChartData: ChartDataSets[] = [
    { data: [], label: 'Resultados del piloto', fill: false },
  ];
  public fPositionsChartOptions: (ChartOptions) = setChartOptions('POSICIONES FINALES EN CARRERA', 'Puesto', 'Nº de veces', 10, false, 'º', 0);
  public mFPositionsChartOptions: (ChartOptions) = setMobileChartOptions(10, false, false, 0);
  public fPositionsChartLabels: Label[] = [];
  public fPositionsChartColors: Color[] = [{
    backgroundColor: '#F17F42',
  }];
  /* END FINISHING POSITIONS CHART */


  /* GRID POSITIONS CHART */
  public gPositionsChartData: ChartDataSets[] = [
    { data: [], label: 'Posición de salida', fill: false },
  ];
  public gPositionsChartOptions: (ChartOptions) = setChartOptions('POSICIONES DE PARRILLA', 'Puesto', 'Nº de veces', 10, false, 'º', 0);
  public mGPositionsChartOptions: (ChartOptions) = setMobileChartOptions(10, false, false, 0);
  public gPositionsChartLabels: Label[] = [];
  public gPositionsChartColors: Color[] = [{
    backgroundColor: '#F17F42',
  }];
  /* END GRID POSITIONS CHART */

  constructor(private route: ActivatedRoute, private driversService: DriversService, private deviceDetector: DeviceDetectorService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params
      .subscribe(params => {
        this.reiniciarVariables();
        this.parametro = params['id'];
        this.resizeCharts(800, 100, 900);
        // this.parametro = this.route.snapshot.paramMap.get('id');

        this.teamMates = this.driversService.getTeamMates(this.parametro);
        this.teamMates.subscribe(data => {
          this.teamMatesData = true;
          console.log(data);
        });

        this.seasonsResults = this.driversService.getSeasonsResults(this.parametro);
        this.seasonsResults.subscribe(res => {
          console.log(res);
          this.seasonChartData[0].data = res.results;
          this.seasonChartLabels = res.seasons;
          this.seasonData = true;
        });

        this.driverSelected = this.driversService.getDriver(this.parametro);
        this.driverSelected.subscribe(driver => {
          this.driverInfo = this.driversService.getInfo(driver);
          this.driverImage = this.driversService.getImage(driver);
        });
        this.stats = this.driversService.getStats(this.parametro);
        this.stats.subscribe(stats => {
          this.statsReady = true;
        });

        this.fpResults = this.driversService.getFinishingPositions(this.parametro);
        this.fpResults.subscribe(data => {
          this.fPositionsChartData[0].data = data.fp[1];
          this.fPositionsChartLabels = data.fp[0];
          this.fpData = true;
          this.gPositionsChartData[0].data = data.gp[1];
          this.gPositionsChartLabels = data.gp[0];
          this.gpData = true;
        });

        this.wins = this.driversService.getWins(this.parametro);
        this.wins.subscribe(data => {
          if (data.lenght > 0) {
            this.winsData = true;
          }
        });

        this.poles = this.driversService.getPoles(this.parametro);
        this.poles.subscribe(data => {
          if (data.lenght > 0) {
            this.polesData = true;
          }
        });
      })
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  resizeCharts(width, height, mobileheight) {
    let canvasArray = document.getElementsByTagName('canvas');
    let lenght = canvasArray.length;
    for (let i = 0; i < lenght; i++) {
      canvasArray.item(i).width = width;
      canvasArray.item(i).height = height;
    }
    if (this.deviceDetector.isMobile()) {
      this.mobile = true;
      this.seasonChartOptions = this.mSeasonChartOptions;
      // this.fPositionsChartOptions = this.mFPositionsChartOptions;
      /* Cambiamos el label para el eje X */
      // this.fPositionsChartOptions.scales.xAxes[0].scaleLabel.labelString = 'Puesto';
      // this.gPositionsChartOptions = this.mGPositionsChartOptions;
      // this.gPositionsChartOptions.scales.xAxes[0].scaleLabel.labelString = 'Puesto';

      for (let i = 0; i < lenght; i++) {
        canvasArray.item(i).height = mobileheight;
      }
      // canvasArray.height = mobileheight;
    }
  }

  reiniciarVariables() {
    this.driverSelected = null;
    this.driverImage = null;
    this.driverInfo = null;
    this.stats = null;
    this.statsReady = false;
    this.mobile = false;
    this.seasonsResults = null;
    this.seasonData = false;
    this.fpResults = null;
    this.fpData = false;
    this.gpResults = null;
    this.gpData = false;
    this.wins = null;
    this.winsData = false;
    this.poles = null;
    this.polesData = false;
    this.teamMates = null;
    this.teamMatesData = false;
  }

}
