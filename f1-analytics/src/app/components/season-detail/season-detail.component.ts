import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DriversService } from 'src/app/services/drivers/drivers.service';

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

  constructor(private route: ActivatedRoute, private drivers: DriversService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params
      .subscribe(params => {
        this.parametro = params['year'];
        this.seasonStandings = this.drivers.getDriverStandings(this.parametro);
      });

    this.seasonStandings.subscribe(data => {
      this.seasonExists = true;
      console.log(data);
    })
  }

}
