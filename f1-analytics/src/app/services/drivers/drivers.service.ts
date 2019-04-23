import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  currentDate = new Date();

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
        let drivers = data.MRData.DriverTable.Drivers;
        subject.next(drivers[randomNumber]);
      });
    return subject.asObservable();
  }


  getCurrentDrivers() {
    let subject = new Subject();
    this.http.get(API_URL + '/current/drivers.json')
      .subscribe((res: any) => {
        let drivers = res.MRData.DriverTable.Drivers;
        subject.next(drivers);
      });
    return subject.asObservable();
  }
}
