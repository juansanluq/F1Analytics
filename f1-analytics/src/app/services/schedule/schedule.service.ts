import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, gp } from '../utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getNextGP() {
    // let currentDate = new Date();
    let currentDate = new Date();
    let subject = new Subject<any>();
    this.getCurrentScheduleWithDate()
      .subscribe(races => {
        for (let i = 0; i < races.length; i++) {
          if (races[i].real_date >= currentDate) {
            subject.next(races[i]);
            break;
          }
        }
      })
    return subject.asObservable();
  }


  getCurrentScheduleWithDate() {
    let subject = new Subject<any>();
    this.http.get(API_URL + '/current.json')
      .subscribe((res: any) => {
        let races = res.MRData.RaceTable.Races;

        let gp_complete_date;
        // Añadimos el objecto Date a las carreras que nos traemos de la API
        for (let i = 0; i < races.length; i++) {
          let gp_date = races[i].date.split("-");
          let gp_year = gp_date[0];
          let gp_month = gp_date[1];
          let gp_day = gp_date[2];

          let gp_time = races[i].time.split(":");
          let gp_hour = gp_time[0];
          let gp_min = gp_time[1];
          let gp_second = gp_time[2].substring(0, gp_time[2].length - 1);

          // Hay que restarle 1 al mes, ya que al tipo Date los meses se le indican como un array index,
          // Por lo que por ejemplo Diciembre correspondería con el índice 11
          gp_complete_date = new Date(gp_year, gp_month - 1, gp_day, Number(gp_hour) + 2, gp_min, gp_second);
          races[i].real_date = gp_complete_date;
        }
        subject.next(races);
      });
    return subject.asObservable();
  }

  getLastGP() {
    let subject = new Subject<gp>();
    this.http.get(API_URL + '/current/last/results.json')
      .subscribe((res: any) => {
        let last_GP = res.MRData.RaceTable.Races[0];
        subject.next(last_GP);
      });
    return subject.asObservable();
  }
}
