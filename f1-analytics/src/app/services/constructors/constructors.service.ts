import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Constructor, API_URL, Driver } from '../utils';
import { DemonymsService } from '../demonyms/demonyms.service';
import { mapFinishingPositions, mapGridPositions } from 'src/core/utils';

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

  getConstructorImage(constructor: any) {
    let splitted_name = constructor.url.split('/');
    const image = new Subject();
    this.http.get('https://en.wikipedia.org/api/rest_v1/page/media/' + splitted_name[splitted_name.length - 1])
      .subscribe((res: any) => {
        try {
          image.next(res.items[0].thumbnail.source);
        } catch (error) {
          // Doing nothing
        }
      }, error => {
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

  getSeasonsResults(id: string) {
    let subject = new Subject();
    let seasonResults;
    let seasonsArray = new Array();
    let resultsArray = new Array();
    this.http.get(API_URL + '/constructors/' + id + '/constructorStandings.json?limit=100')
      .subscribe((res: any) => {
        let standings = res.MRData.StandingsTable.StandingsLists;
        if (standings.length === 0) {
          subject.next(null);
        } else {
          for (const standingRecord of standings) {
            seasonsArray.push(standingRecord.season);
            resultsArray.push(standingRecord.ConstructorStandings[0].position);
          }
          seasonResults = {
            seasons: seasonsArray,
            results: resultsArray,
          };
          subject.next(seasonResults);
        }
      });
    return subject.asObservable();
  }

  getRaceResults(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/results.json?limit=5000')
      .subscribe((data: any) => {
        subject.next(data.MRData.RaceTable.Races);
      });
    return subject.asObservable();
  }

  getFinishingPositions(id: string) {
    let subject = new Subject();
    this.getRaceResults(id).subscribe((results: any) => {
      let retornable = {
        fp: mapFinishingPositions(results),
        gp: mapGridPositions(results),
      }
      subject.next(retornable);
    });
    return subject.asObservable();
  }

  getDrivers(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/drivers.json?limit=3000')
      .subscribe((data: any) => {
        let drivers = data.MRData.DriverTable.Drivers.map(item => {
          let dc;
          dc = item.code ? item.code : '---';
          return {
            driverId: item.driverId,
            fullName: item.givenName + ' ' + item.familyName,
            countryCode: this.demonymsService.getCountryCode(item.nationality),
            code: dc,
          };
        });
        subject.next(drivers);
      });
    return subject.asObservable();
  }

  getDriversChamp(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/driverStandings/1.json?limit=1000')
      .subscribe((data: any) => {
        let driverChampionships = [];
        data.MRData.StandingsTable.StandingsLists.map(item => {
          if (item.DriverStandings[0].Constructors[0].constructorId === id) {
            driverChampionships.push({
              season: item.season,
              driverName: item.DriverStandings[0].Driver.givenName + ' ' + item.DriverStandings[0].Driver.familyName,
              driverCountryCode: this.demonymsService.getCountryCode(item.DriverStandings[0].Driver.nationality)
            });
          }
        });
        subject.next(driverChampionships);
      });
    return subject.asObservable();
  }

  getConstructorsChamp(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/constructorStandings/1.json?limit=1000')
      .subscribe((data: any) => {
        let cC = data.MRData.StandingsTable.StandingsLists.map(item => {
          return item.season;
        })
        subject.next(cC);
      });
    return subject.asObservable();
  }

  getWins(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/constructors/' + id + '/results/1.json?limit=1000')
      .subscribe((data: any) => {
        let events = [];
        let year = 0;
        data.MRData.RaceTable.Races.map(item => {
          if (year != item.season) {
            events.push({
              season: item.season,
              round: item.round,
              raceName: item.raceName,
              driver: item.Results[0].Driver.givenName + ' ' + item.Results[0].Driver.familyName,
              driverId: item.Results[0].Driver.driverId,
              firstWinInSeason: true,
            });
            year = item.season;
          } else {
            events.push({
              season: item.season,
              round: item.round,
              raceName: item.raceName,
              driver: item.Results[0].Driver.givenName + ' ' + item.Results[0].Driver.familyName,
              driverId: item.Results[0].Driver.driverId,
              firstWinInSeason: false,
            });
          }
        });
        subject.next(events);
      });
    return subject.asObservable();
  }
}
