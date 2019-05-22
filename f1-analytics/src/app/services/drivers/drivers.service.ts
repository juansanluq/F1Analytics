import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils';
import { Subject, forkJoin } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { LoadDriversAction } from 'src/app/store/actions';
import { DemonymsService } from '../demonyms/demonyms.service';
import wiki from 'wikijs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  currentDate = new Date();
  podiumCount;

  constructor(private http: HttpClient, private store: Store<AppState>, private demonymsService: DemonymsService) { }


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
    if (driver.familyName === 'Sainz') {
      driver.familyName = 'Sainz Jr.';
    }
    const subject = new Subject();
    const searchTerm = driver.givenName.replace(' ', '_') + '_' + driver.familyName.replace(' ', '_');
    this.http.get('https://es.wikipedia.org/api/rest_v1/page/summary/' + searchTerm)
      .subscribe((res: any) => subject.next(res.extract));
    return subject;
  }

  getImage(driver: any) {
    if (driver.familyName === 'Sainz') {
      driver.familyName = 'Sainz Jr.';
    }
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

  getAllDriversOrdered() {
    let subject = new Subject();
    this.http.get(API_URL + '/drivers.json?limit=1000')
      .subscribe((res: any) => {
        let pilotos = res.MRData.DriverTable.Drivers;
        pilotos = pilotos.sort((a, b) => {
          let nameA = a.givenName.toUpperCase();
          let nameB = b.givenName.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });
        subject.next(pilotos);
      })
    return subject.asObservable();
  }

  getFirstCharacterOfDriversArray(drivers: any[]) {
    let letras = new Array();
    let primeraLetra = '';
    for (const driver of drivers) {
      if (driver.givenName.charAt(0) != primeraLetra) {
        letras.push(driver.givenName.charAt(0));
        primeraLetra = driver.givenName.charAt(0);
      }
    }
    return letras;
  }

  getDriverStandings(año: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/' + año + '/driverStandings.json')
      .subscribe((data: any) => {
        let DriverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        DriverStandings.map(item => {
          item.Driver.countryCode = this.demonymsService.getCountryCode(item.Driver.nationality);
        })
        subject.next(DriverStandings);
      });
    return subject.asObservable();
  }

  getDriver(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/drivers/' + id + '.json?limit=1')
      .subscribe((data: any) => {
        let driver = data.MRData.DriverTable.Drivers[0];
        driver.countryCode = this.demonymsService.getCountryCode(driver.nationality);
        this.getBirthPlace(driver.givenName + ' ' + driver.familyName)
          .then(place => {
            driver.birthPlace = place;
            subject.next(driver);
          })
      });
    return subject.asObservable();
  }

  getBirthPlace(driverName: any) {
    return wiki().page(driverName)
      .then(page => page.info('birthPlace'))
      .catch(data => { })
  }

  getStats(id: string) {
    let statistics = {
      raceCount: undefined,
      seasonCount: undefined,
      winsCount: undefined,
      podiumsCount: undefined,
      polesCount: undefined,
      championshipsCount: undefined,
      bestResult: undefined,
    };
    let raceCountUrl = API_URL + '/drivers/' + id + '/results.json?limit=1000';
    let seasonCountUrl = API_URL + '/drivers/' + id + '/seasons.json?limit=1000';
    let winsUrl = API_URL + '/drivers/' + id + '/results/1.json?limit=1000';
    let podiumsUrl = API_URL + '/drivers/' + id + '/results.json?limit=1000';
    let polesUrl = API_URL + '/drivers/' + id + '/grid/1/results.json?limit=1000';
    let championsUrl = API_URL + '/drivers/' + id + '/driverStandings/1.json?limit=100';

    let getRaceCount = this.http.get(raceCountUrl);
    let getSeasonCount = this.http.get(seasonCountUrl);
    let getWinsCount = this.http.get(winsUrl);
    let getPodiumsCount = this.http.get(podiumsUrl);
    let getPolesCount = this.http.get(polesUrl);
    let getChampionshipsCount = this.http.get(championsUrl);

    forkJoin([getRaceCount, getSeasonCount]).subscribe((res: any) => {
      statistics.raceCount = res[0].MRData.RaceTable.Races.length;
      statistics.seasonCount = res[1].MRData.SeasonTable.Seasons.length;

      forkJoin([getWinsCount, getPodiumsCount, getPolesCount, getChampionshipsCount]).subscribe((res: any) => {
        statistics.winsCount = res[0].MRData.RaceTable.Races.length;
        let podiumsCounter = 0;
        res[1].MRData.RaceTable.Races.map(item => {
          if (item.Results[0].position === '1' || item.Results[0].position === '2' || item.Results[0].position === '3') {
            return podiumsCounter++;
          }
        });
        statistics.podiumsCount = podiumsCounter;
        statistics.polesCount = res[2].MRData.RaceTable.Races.length;
        statistics.championshipsCount = res[3].MRData.StandingsTable.StandingsLists.length;
        let bestPosition = 99;
        res[1].MRData.RaceTable.Races.map(item => {
          bestPosition = parseInt(item.Results[0].position) < bestPosition ? parseInt(item.Results[0].position) : bestPosition;
        });
        statistics.bestResult = bestPosition;
      })
    })
  }
}
