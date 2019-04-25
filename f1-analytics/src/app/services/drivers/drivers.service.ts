import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { LoadDriversAction } from 'src/app/store/actions';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  currentDate = new Date();
  podiumCount;

  constructor(private http: HttpClient, private store: Store<AppState>) { }


  getAllDrivers() {
    return this.http.get(API_URL + '/drivers.json?limit=850');
  }


  getDriverOfTheDay() {
    let subject = new Subject<string>();
    let randomNumber;
    randomNumber = this.currentDate.getDay() + this.currentDate.getMonth() + (this.currentDate.getFullYear() - 1905);
    this.getAllDrivers()
      .subscribe((data: any) => {
        const drivers = data.MRData.DriverTable.Drivers;
        this.store.dispatch(new LoadDriversAction(drivers));
        subject.next(drivers[randomNumber]);
        // subject.next(drivers[9]);
      });
    return subject.asObservable();
  }


  getCurrentDrivers() {
    const subject = new Subject();
    this.http.get(API_URL + '/current/drivers.json')
      .subscribe((res: any) => {
        let drivers = res.MRData.DriverTable.Drivers;
        subject.next(drivers);
      });
    return subject.asObservable();
  }

  getChampionshipsbyDriverId(driverId: string) {
    const subject = new Subject();
    this.http.get(API_URL + '/drivers/' + driverId + '/driverStandings/1.json')
      .subscribe((res: any) => {
        subject.next(res.MRData.StandingsTable.StandingsLists.length);
      });
    return subject.asObservable();
  }

  getVictoriesbyDriverId(driverId: string) {
    const subject = new Subject();
    this.http.get(API_URL + '/drivers/' + driverId + '/results/1.json?limit=1000')
      .subscribe((res: any) => {
        subject.next(res.MRData.RaceTable.Races.length);
        this.podiumCount = res.MRData.RaceTable.Races.length;
      });
    return subject.asObservable();
  }

  getPodiumsbyDriverId(driverId: string) {
    const subject = new Subject();
    this.http.get(API_URL + '/drivers/' + driverId + '/results/2.json?limit=1000')
      .subscribe((res: any) => {
        this.podiumCount = this.podiumCount + res.MRData.RaceTable.Races.length;
        this.http.get(API_URL + '/drivers/' + driverId + '/results/3.json?limit=1000')
          .subscribe((res: any) => {
            this.podiumCount = this.podiumCount + res.MRData.RaceTable.Races.length;
            subject.next(this.podiumCount);
          });
      });
    return subject.asObservable();
  }

  getPolesbyDriverId(driverId: string) {
    const subject = new Subject();
    this.http.get(API_URL + '/drivers/' + driverId + '/results/1/qualifying.json?limit=1000')
      .subscribe((res: any) => {
        subject.next(res.MRData.RaceTable.Races.length);
      });
    return subject.asObservable();
  }

  getInfo(driver: any) {
    const subject = new Subject();
    const searchTerm = driver.givenName.replace(' ', '_') + '_' + driver.familyName.replace(' ', '_');
    this.http.get('https://es.wikipedia.org/api/rest_v1/page/summary/' + searchTerm)
      .subscribe((res: any) => subject.next(res.extract));
    return subject;
  }

  getImage(driver: any) {
    const subject = new Subject();
    const searchTerm = driver.givenName.replace(' ', '_') + '_' + driver.familyName.replace(' ', '_');
    this.http.get('https://es.wikipedia.org/api/rest_v1/page/media/' + searchTerm)
      .subscribe((res: any) => {

        try {
          subject.next(res.items[0].thumbnail.source);
        } catch (TypeError) {
          subject.next(null);
        }
      });
    return subject;
  }
}
