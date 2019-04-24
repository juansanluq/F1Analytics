import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../services/drivers/drivers.service';
import { driver } from '../../services/utils';
import { Subject, Observable, of } from 'rxjs';
import wiki from 'wikijs';

@Component({
  selector: 'app-dotd',
  templateUrl: './dotd.component.html',
  styleUrls: ['./dotd.component.scss']
})
export class DotdComponent implements OnInit {

  driverOTD;
  championshipsCount;
  winsCount;
  podiumsCount;
  polesCount;
  info;
  image: any = '../../../assets/images/image_placeholder.png';

  constructor(private driversService: DriversService) { }

  ngOnInit() {
    this.driversService.getDriverOfTheDay()
      .subscribe(driver => {
        this.driverOTD = driver;

        this.driversService.getChampionshipsbyDriverId(this.driverOTD.driverId)
          .subscribe(championships => {
            this.championshipsCount = championships;
          });

        this.driversService.getVictoriesbyDriverId(this.driverOTD.driverId)
          .subscribe(wins => {
            this.winsCount = wins;
          });

        this.driversService.getPodiumsbyDriverId(this.driverOTD.driverId)
          .subscribe(podiums => {
            this.podiumsCount = podiums;
          });
        console.log(this.driverOTD);
        this.driversService.getPolesbyDriverId(this.driverOTD.driverId)
          .subscribe(poles => this.polesCount = poles);

        this.driversService.getInfo(this.driverOTD)
          .subscribe(info => this.info = info);

        this.driversService.getImage(this.driverOTD)
          .subscribe(image => {
            if (image != null) {
              this.image = image;
            }
          });
      });
  }

}
