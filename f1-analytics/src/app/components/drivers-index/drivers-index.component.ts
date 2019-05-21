import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../services/drivers/drivers.service';
import { DemonymsService } from '../../services/demonyms/demonyms.service';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-drivers-index',
  templateUrl: './drivers-index.component.html',
  styleUrls: ['./drivers-index.component.scss']
})
export class DriversIndexComponent implements OnInit {

  drivers = new Array();
  driversReady = false;
  letras;
  currentDrivers: Observable<any>;
  currentDriversReady = false;
  mobile = false;

  constructor(private driversService: DriversService, private demonymsService: DemonymsService,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.checkMobile();
    this.currentDrivers = this.driversService.getDriverStandings('2019');
    this.driversService.getAllDriversOrdered()
      .subscribe((drivers: any) => {
        for (const driver of drivers) {
          let driverWithCountryCode;
          driverWithCountryCode = {
            ...driver,
            countryCode: this.demonymsService.getCountryCode(driver.nationality),
          }
          this.drivers.push(driverWithCountryCode);
        }
        this.letras = this.driversService.getFirstCharacterOfDriversArray(drivers);
        this.driversReady = true;
      });

    this.currentDrivers.subscribe(data => {
      this.currentDriversReady = true;
      console.log(data);
    });
  }

  checkMobile() {
    this.mobile = this.deviceService.isMobile() ? true : false;
  }

}
