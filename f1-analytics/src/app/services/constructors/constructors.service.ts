import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Constructor, API_URL, Driver } from '../utils';
import { DemonymsService } from '../demonyms/demonyms.service';

@Injectable({
  providedIn: 'root'
})
export class ConstructorsService {

  constructor(private http: HttpClient, private demonymsService: DemonymsService) { }

  getCurrentConstructors(): Observable<any> {
    let constructors = new Subject();
    this.http.get(API_URL + '/2019/constructorStandings.json')
      .subscribe((res: any) => {
        constructors.next(res.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
      });
    return constructors.asObservable();
  }

  getFirtCharacterOfConstructorsArray(constructores) {
    let letras = new Array();
    let primeraLetra = '';
    for (const circuito of constructores) {
      if (circuito.name.charAt(0) != primeraLetra) {
        letras.push(circuito.name.charAt(0));
        primeraLetra = circuito.name.charAt(0);
      }
    }
    return letras;
  }

  getAllConstructors() {
    let constructorsOb = new Subject();
    this.http.get(API_URL + '/constructors.json?limit=1000')
      .subscribe((res: any) => {
        let constructorsWCCArray = new Array();
        let constructors = res.MRData.ConstructorTable.Constructors;
        for (let constructor of constructors) {
          let constructorWCC = {
            ...constructor,
            countryCode: this.demonymsService.getCountryCode(constructor.nationality)
          };
          constructorsWCCArray.push(constructorWCC);
        }
        constructorsOb.next(constructorsWCCArray);
      });
    return constructorsOb.asObservable();
  }

  getNationalityByConstructorID(id: string) {
    let nationality = new Subject<string>();
    this.http.get(API_URL + '/constructors/' + id + '.json')
      .subscribe((res: any) => {
        nationality.next(res.MRData.ConstructorTable.Constructors[0].nationality);
      });
    return nationality.asObservable();
  }

  getConstructorByID(id: string) {
    let constructor = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '.json')
      .subscribe((res: any) => {
        constructor.next(res.MRData.ConstructorTable.Constructors[0] = {
          ...res.MRData.ConstructorTable.Constructors[0],
          countryCode: this.demonymsService.getCountryCode(res.MRData.ConstructorTable.Constructors[0].nationality)
        });
      });
    return constructor.asObservable();
  }

  getCurrentDriversByConstructorID(id: string): Observable<Driver[]> {
    let drivers = new Subject<Driver[]>();
    this.http.get(API_URL + '/current/constructors/' + id + '/drivers.json')
      .subscribe((res: any) => {
        const rawdrivers = res.MRData.DriverTable.Drivers;
        const driversWithCountryCode = new Array();
        for (let driver of rawdrivers) {
          driver = {
            ...driver,
            countryCode: this.demonymsService.getCountryCode(driver.nationality),
          };
          driversWithCountryCode.push(driver);
        }
        drivers.next(driversWithCountryCode);
      });
    return drivers.asObservable();
  }

  getVictoriesCountByConstructorID(id: string) {
    const count = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/results/1.json?limit=1000')
      .subscribe((res: any) => {
        count.next(res.MRData.RaceTable.Races.length);
      });
    return count.asObservable();
  }

  getRacesCountByConstructorID(id: string) {
    const count = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/results.json?limit=5000')
      .subscribe((res: any) => count.next(res.MRData.RaceTable.Races.length));
    return count.asObservable();
  }

  getPolesCountByConstructorID(id: string) {
    const count = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/grid/1/results.json?limit=5000')
      .subscribe((res: any) => count.next(res.MRData.RaceTable.Races.length));
    return count.asObservable();
  }

  getSeasonCountByConstructorID(id: string) {
    const count = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/seasons.json?limit=1000')
      .subscribe((res: any) => count.next(res.MRData.SeasonTable.Seasons.length));
    return count.asObservable();
  }

  getDriverChampionshipsCountByConstructorID(id: string) {
    const countOb = new Subject();
    let count = 0;
    this.http.get(API_URL + '/driverStandings/1.json?limit=1000')
      .subscribe((res: any) => {
        let StandingLists = res.MRData.StandingsTable.StandingsLists;
        for (const standing of StandingLists) {
          // console.log(standing.DriverStandings[0].Constructors[0].constructorId);
          let constructors = standing.DriverStandings[0].Constructors;
          for (const constructor of constructors) {
            if (constructor.constructorId === id) {
              count++;
            }
          }
        }
        countOb.next(count);
      });
    return countOb.asObservable();
  }

  getConstructorChampionshipsCountByConstructorID(id: string) {
    const count = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/constructorStandings/1.json?limit=1000')
      .subscribe((res: any) => count.next(res.MRData.StandingsTable.StandingsLists.length));
    return count.asObservable();
  }

  getConstructorImage(name: string) {
    const image = new Subject();
    this.http.get('https://en.wikipedia.org/api/rest_v1/page/media/' + name + '_F1_Team')
      .subscribe((res: any) => image.next(res.items[0].thumbnail.source), error => {
        this.http.get('https://en.wikipedia.org/api/rest_v1/page/media/' + name)
          .subscribe((res: any) => {
            try {
              image.next(res.items[0].thumbnail.source);
            } catch (error) {
              // Doing nothing
            }
          }, error => {
            image.next(null);
          });
      });
    return image.asObservable();
  }

  getConstructorInfo(constructor: any) {
    const info = new Subject();
    let data;
    let splitted_name = constructor.url.split('/');
    console.log(constructor.name);
    this.http.get('https://es.wikipedia.org/api/rest_v1/page/summary/' + constructor.name + '_F1_Team')
      .subscribe((res: any) => {
        data = {
          text: res.extract,
          url: res.content_urls.desktop.page,
        };
        info.next(data);

      }, error => {
        this.http.get('https://es.wikipedia.org/api/rest_v1/page/summary/' + splitted_name[splitted_name.length - 1])
          .subscribe((res: any) => {
            data = {
              text: res.extract,
              url: res.content_urls.desktop.page,
            };
            info.next(data);
          }, error => info.next(null));
      });
    return info.asObservable();
  }
}
