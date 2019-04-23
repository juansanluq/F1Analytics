import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, driver } from '../utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  currentDate = new Date();
  podiumCount;

  constructor(private http: HttpClient) { }


  getAllDrivers() {
    return this.http.get(API_URL + '/drivers.json?limit=850');
  }


  getDriverOfTheDay() {
    let subject = new Subject<string>();
    let randomNumber;
    randomNumber = this.currentDate.getDay() + this.currentDate.getMonth() + (this.currentDate.getFullYear() - 1812);

    this.getAllDrivers()
      .subscribe((data: any) => {
        const drivers = data.MRData.DriverTable.Drivers;
        subject.next(drivers[randomNumber]);
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
}
