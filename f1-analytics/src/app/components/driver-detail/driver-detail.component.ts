import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from '../../services/drivers/drivers.service';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { setChartOptions, setMobileChartOptions } from 'src/core/utils';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent implements OnInit {

  parametro;
  driverSelected: Observable<any>;
  driverImage: Observable<any>;
  driverInfo: Observable<any>;
  stats: Observable<any>;
  statsReady = false;
  mobile = false;

  seasonsResults: Observable<any>;
  seasonData = false;


  public seasonChartData: ChartDataSets[] = [
    { data: [], label: 'Resultados por temporada', fill: false },
  ];
  public seasonChartLabels: Label[] = [];
  public seasonChartOptions: (ChartOptions) = setChartOptions('RESULTADOS DEL CAMPEONATO DE PILOTOS', 'Temporadas', 'Puesto', 1, true, true);
  public mSeasonChartOptions: (ChartOptions) = setMobileChartOptions(3, true, true);
  public seasonChartColors: Color[] = [
    { // grey
      backgroundColor: '#000',
      borderColor: '#F17F42',
      pointBackgroundColor: '#000',
      pointBorderColor: '#fff',

    }
  ];

  constructor(private route: ActivatedRoute, private driversService: DriversService, private deviceDetector: DeviceDetectorService) { }

  ngOnInit() {
    this.resizeCharts(800, 100, 900);
    this.parametro = this.route.snapshot.paramMap.get('id');

    this.seasonsResults = this.driversService.getSeasonsResults(this.parametro);
    this.seasonsResults.subscribe(res => {
      console.log(res);
      this.seasonChartData[0].data = res.results;
      this.seasonChartLabels = res.seasons;
      this.seasonData = true;
    })

    this.driverSelected = this.driversService.getDriver(this.parametro);
    this.driverSelected.subscribe(driver => {
      this.driverImage = this.driversService.getImage(driver);
      this.driverInfo = this.driversService.getInfo(driver);
    });
    this.stats = this.driversService.getStats(this.parametro);
    this.stats.subscribe(stats => {
      this.statsReady = true;
    });
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

}
