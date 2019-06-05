import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DriversService } from 'src/app/services/drivers/drivers.service';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

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

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
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
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
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
    });

    this.pointsDistribution.subscribe(data => {
      data.map(item => {
        this.pieChartLabels.push(item.constructor.name);
        this.pieChartData.push(item.percentage);
        console.log(item);
      })
    });
  }

}