import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../services/drivers/drivers.service';
import { driver } from '../../services/utils';
import { Subject, Observable, of } from 'rxjs';

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
  dataLoaded: Observable<boolean> = of(false);

  constructor(private driversService: DriversService) { }

  ngOnInit() {
    this.driversService.getDriverOfTheDay()
      .subscribe(driver => {
        this.driverOTD = driver;

        this.driversService.getChampionshipsbyDriverId('alonso')
          .subscribe(championships => {
            this.championshipsCount = championships;
          });

        this.driversService.getVictoriesbyDriverId('alonso')
          .subscribe(wins => {
            this.winsCount = wins;
          });

        this.driversService.getPodiumsbyDriverId('alonso')
          .subscribe(podiums => {
            this.podiumsCount = podiums;
          });
        console.log(this.driverOTD);
        this.driversService.getPolesbyDriverId('alonso')
          .subscribe(poles => this.polesCount = poles);
      });
    this.dataIsLoaded()
      .subscribe((isloaded: boolean) => this.dataLoaded = of(isloaded));
  }

  dataIsLoaded() {
    const subject = new Subject();
    if (this.driverOTD != null && this.championshipsCount != null && this.winsCount != null
      && this.podiumsCount != null && this.polesCount != null) {
      subject.next(true);
    }
    return subject.asObservable();
  }

}
