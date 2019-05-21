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


  constructor(private route: ActivatedRoute, private driversService: DriversService) { }

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.driverSelected = this.driversService.getDriver(this.parametro);
    this.driverSelected.subscribe(driver => {
      this.driverImage = this.driversService.getImage(driver);
      this.driverInfo = this.driversService.getInfo(driver);
      this.driverInfo.subscribe(console.log);
    });
  }

}
