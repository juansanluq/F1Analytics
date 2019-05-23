import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from '../../services/drivers/drivers.service';
import { Observable } from 'rxjs';

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


  constructor(private route: ActivatedRoute, private driversService: DriversService) { }

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.driverSelected = this.driversService.getDriver(this.parametro);
    this.driverSelected.subscribe(driver => {
      this.driverImage = this.driversService.getImage(driver);
      this.driverInfo = this.driversService.getInfo(driver);
    });
    this.stats = this.driversService.getStats(this.parametro);
    this.stats.subscribe(stats => {
      this.statsReady = true;
      console.log(stats);
    });
  }

}
