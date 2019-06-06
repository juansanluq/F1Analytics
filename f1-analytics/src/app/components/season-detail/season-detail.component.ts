import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DriversService } from 'src/app/services/drivers/drivers.service';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { random_rgba } from 'src/core/utils';
import { colorList } from 'src/app/services/utils';
import * as rc from '../../../core/randomColor.js'

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.scss']
})
export class SeasonDetailComponent implements OnInit {

  paramSubscription: any;
  parametro;
  seasonStandings: Observable<any>;
  seasonExists = false;
  pointsDistribution: Observable<any>;
  seasonWins: Observable<any> = new Observable();

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      labels: {
        fontSize: 20,
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];


  constructor(private route: ActivatedRoute, private drivers: DriversService, private seasons: SeasonsService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params
      .subscribe(params => {
        this.parametro = params['year'];
        this.seasonStandings = this.drivers.getDriverStandings(this.parametro);
        this.pointsDistribution = this.seasons.getPointsDistribution(this.parametro);
      });

    this.seasonStandings.subscribe(data => {
      this.seasonExists = true;
      this.seasons.getPointsDistribution(this.parametro);
      this.seasonWins = this.seasons.getSeasonsWins(this.parametro);
    });

    this.pointsDistribution.subscribe(data => {
      let half_length = Math.ceil(data.length / 2);
      let leftSide = data.splice(0, half_length);
      let pointsCounter, percentageCounter = 0;
      data.map((item, index) => {
        pointsCounter += item.points;
        percentageCounter += item.percentage;
        if (index === (data.length - 1)) {
          leftSide.push({
            constructor: {
              name: 'Otros',
            },
            percentage: percentageCounter,
            points: pointsCounter
          });
        }
      });
      leftSide.map(item => {
        this.pieChartLabels.push(item.constructor.name);
        this.pieChartData.push(item.percentage);
        this.pieChartColors[0].backgroundColor.push(rc.randomColor({
          luminosity: 'light',
          format: 'rgba',
          hue: 'rgba(241, 127, 66, 1)',
          alpha: 1
        }));
      })
    });
  }

}
