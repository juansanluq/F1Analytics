import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils';
import { mapSeasons, mapPointsDistribution } from 'src/core/utils';
import { ScheduleService } from '../schedule/schedule.service';
import { Subject } from 'rxjs';
import { DemonymsService } from '../demonyms/demonyms.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  constructor(private http: HttpClient, private schedule: ScheduleService, private demonyms: DemonymsService) { }

  getSeasonsList() {
    let subject = new Subject();
    this.http.get(API_URL + '.json?limit=5000')
      .subscribe((data: any) => {
        let seasons = data.MRData.RaceTable.Races;
        if (data.MRData.total > data.MRData.limit) {
          this.http.get(API_URL + '.json?limit=1000&offset=1000')
            .subscribe((data: any) => {
              seasons = [...seasons, ...data.MRData.RaceTable.Races];
              seasons = mapSeasons(seasons);
              this.schedule.getLastGP().subscribe(data => {
                seasons = [...seasons, {
                  'season': data.season,
                  'eventsCount': data.round + ' y contando...',
                }];
                subject.next(seasons);
              })
            });
        }
      });
    return subject.asObservable();
  }

  getPointsDistribution(season: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/' + season + '/driverStandings.json?limit=1000')
      .subscribe((data: any) => {
        subject.next(mapPointsDistribution(data.MRData.StandingsTable.StandingsLists[0].DriverStandings));
      });
    return subject.asObservable();
  };

  getSeasonsWins(season: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/' + season + '/results/1.json?limit=1000').subscribe((data: any) => {
      let results = data.MRData.RaceTable.Races;
      results.map(item => {
        item.Results[0].Driver = {
          ...item.Results[0].Driver,
          'countryCode': this.demonyms.getCountryCode(item.Results[0].Driver.nationality),
        }
      })
      console.log(results);
      subject.next(results);
    });
    return subject.asObservable();
  }
}
