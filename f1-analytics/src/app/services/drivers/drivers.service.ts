import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils';
import { Subject, forkJoin, combineLatest } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { LoadDriversAction } from 'src/app/store/actions';
import { DemonymsService } from '../demonyms/demonyms.service';
import wiki from 'wikijs';
import { getPercentage, getAvg, mapFinishingPositions, mapGridPositions } from '../../../core/utils';

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
      .subscribe((res: any) => {
        if (res.type === 'disambiguation') {
          this.http.get('https://es.wikipedia.org/api/rest_v1/page/summary/' + searchTerm + '_(piloto)')
            .subscribe((data: any) => subject.next(data.extract));
        }
        subject.next(res.extract);
      });
    return subject;
  }

  getImage(driver: any) {
    if (driver.familyName === 'Sainz') {
      driver.familyName = 'Sainz Jr.';
    }
    const subject = new Subject();
    // const searchTerm = driver.givenName.replace(' ', '_') + '_' + driver.familyName.replace(' ', '_');
    const searchTerm = driver.url.split('/');

    this.http.get('https://en.wikipedia.org/api/rest_v1/page/media/' + searchTerm[searchTerm.length - 1])
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
    let subject = new Subject();
    let statistics = {
      raceCount: undefined,
      seasonCount: undefined,
      wins: {
        count: undefined,
        percentage: undefined,
      },
      podiums: {
        count: undefined,
        percentage: undefined,
      },
      poles: {
        count: undefined,
        percentage: undefined,
      },
      championships: {
        count: undefined,
        percentage: undefined,
      },
      bestResult: undefined,
      points: {
        count: undefined,
        average: undefined,
      },
      retirements: {
        count: undefined,
        percentage: undefined,
      }
    };
    const raceCountUrl = API_URL + '/drivers/' + id + '/results.json?limit=1000';
    const seasonCountUrl = API_URL + '/drivers/' + id + '/seasons.json?limit=1000';
    const winsUrl = API_URL + '/drivers/' + id + '/results/1.json?limit=1000';
    const podiumsUrl = API_URL + '/drivers/' + id + '/results.json?limit=1000';
    const polesUrl = API_URL + '/drivers/' + id + '/grid/1/results.json?limit=1000';
    const championsUrl = API_URL + '/drivers/' + id + '/driverStandings/1.json?limit=100';
    const pointsUrl = API_URL + '/drivers/' + id + '/results.json?limit=1000';

    const getRaceCount = this.http.get(raceCountUrl);
    const getSeasonCount = this.http.get(seasonCountUrl);
    const getWinsCount = this.http.get(winsUrl);
    const getPodiumsCount = this.http.get(podiumsUrl);
    const getPolesCount = this.http.get(polesUrl);
    const getChampionshipsCount = this.http.get(championsUrl);
    const getPointsCount = this.http.get(pointsUrl);

    forkJoin([getRaceCount, getSeasonCount, getPointsCount]).subscribe((res: any) => {
      statistics.raceCount = res[0].MRData.RaceTable.Races.length;
      statistics.seasonCount = res[1].MRData.SeasonTable.Seasons.length;
      let pointsCounter = 0;
      let retirementsCounter = 0;
      res[2].MRData.RaceTable.Races.map(item => {
        if (item.Results[0].positionText === 'R' || item.Results[0].positionText === 'D'
          || item.Results[0].positionText === 'E' || item.Results[0].positionText === 'W'
          || item.Results[0].positionText === 'F' || item.Results[0].positionText === 'N') {
          retirementsCounter++;
        }
        pointsCounter += parseFloat(item.Results[0].points);
      });
      statistics.retirements.count = retirementsCounter;
      statistics.retirements.percentage = getPercentage(statistics.retirements.count, statistics.raceCount);
      statistics.points.count = pointsCounter;
      statistics.points.average = getAvg(statistics.points.count, statistics.raceCount);

      forkJoin([getWinsCount, getPodiumsCount, getPolesCount, getChampionshipsCount]).subscribe((res: any) => {
        statistics.wins.count = res[0].MRData.RaceTable.Races.length;
        statistics.wins.percentage = getPercentage(statistics.wins.count, statistics.raceCount);
        let podiumsCounter = 0;
        res[1].MRData.RaceTable.Races.map(item => {
          if (item.Results[0].position === '1' || item.Results[0].position === '2' || item.Results[0].position === '3') {
            return podiumsCounter++;
          }
        });
        statistics.podiums.count = podiumsCounter;
        statistics.podiums.percentage = getPercentage(statistics.podiums.count, statistics.raceCount);
        statistics.poles.count = res[2].MRData.RaceTable.Races.length;
        statistics.poles.percentage = getPercentage(statistics.poles.count, statistics.raceCount);
        statistics.championships.count = res[3].MRData.StandingsTable.StandingsLists.length;
        statistics.championships.percentage = getPercentage(statistics.championships.count, statistics.seasonCount);
        let bestPosition = 99;
        res[1].MRData.RaceTable.Races.map(item => {
          bestPosition = parseInt(item.Results[0].position) < bestPosition ? parseInt(item.Results[0].position) : bestPosition;
        });
        statistics.bestResult = bestPosition;
        subject.next(statistics);
      });
    });
    return subject.asObservable();
  }

  getSeasonsResults(id: string) {
    let subject = new Subject();
    let seasonResults;
    let seasonsArray = new Array();
    let resultsArray = new Array();
    this.http.get(API_URL + '/drivers/' + id + '/driverStandings.json?limit=100')
      .subscribe((res: any) => {
        let standings = res.MRData.StandingsTable.StandingsLists;
        if (standings.length === 0) {
          this.http.get(API_URL + '/current/drivers/' + id + '/driverStandings.json?limit=100')
            .subscribe((res: any) => {
              standings = res.MRData.StandingsTable.StandingsLists;
              console.log('2019 Standings', standings);
              for (const standingRecord of standings) {
                seasonsArray.push(standingRecord.season);
                resultsArray.push(standingRecord.DriverStandings[0].position);
              }

              seasonResults = {
                seasons: seasonsArray,
                results: resultsArray,
              };
              subject.next(seasonResults);
            })
        } else {
          for (const standingRecord of standings) {
            seasonsArray.push(standingRecord.season);
            resultsArray.push(standingRecord.DriverStandings[0].position);
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


  getFinishingPositions(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/drivers/' + id + '/results.json?limit=1000').subscribe((data: any) => {
      let results = data.MRData.RaceTable.Races;
      let retornable = {
        fp: mapFinishingPositions(results),
        gp: mapGridPositions(results),
      }
      subject.next(retornable);
    });
    return subject.asObservable();
  };

  getWins(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/drivers/' + id + '/results/1.json?limit=1000')
      .subscribe((data: any) => {
        let events = [];
        let year = 0;
        data.MRData.RaceTable.Races.map(item => {
          if (year != item.season) {
            events.push({
              season: item.season,
              round: item.round,
              raceName: item.raceName,
              constructor: item.Results[0].Constructor.name,
              constructorId: item.Results[0].Constructor.constructorId,
              firstWinInSeason: true,
            });
            year = item.season;
          } else {
            events.push({
              season: item.season,
              round: item.round,
              raceName: item.raceName,
              constructor: item.Results[0].Constructor.name,
              constructorId: item.Results[0].Constructor.constructorId,
              firstWinInSeason: false,
            });
          }
        });
        subject.next(events);
      });
    return subject.asObservable();
  }

  getPoles(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/drivers/' + id + '/grid/1/results.json?limit=1000')
      .subscribe((data: any) => {
        let events = [];
        let year = 0;
        data.MRData.RaceTable.Races.map(item => {
          if (year != item.season) {
            events.push({
              season: item.season,
              round: item.round,
              raceName: item.raceName,
              constructor: item.Results[0].Constructor.name,
              constructorId: item.Results[0].Constructor.constructorId,
              firstWinInSeason: true,
            });
            year = item.season;
          } else {
            events.push({
              season: item.season,
              round: item.round,
              raceName: item.raceName,
              constructor: item.Results[0].Constructor.name,
              constructorId: item.Results[0].Constructor.constructorId,
              firstWinInSeason: false,
            });
          }
        });
        subject.next(events);
      });
    return subject.asObservable();
  }

  getTeamMates(id: string) {
    let subject = new Subject();
    let temporadas;
    this.http.get(API_URL + '/drivers/' + id + '/driverStandings.json?limit=1000')
      .subscribe((data: any) => {
        let standings = data.MRData.StandingsTable.StandingsLists;
        temporadas = standings.map(item => {
          return {
            "season": item.season,
            "constructor": item.DriverStandings[0].Constructors[0],
            "teamMates": [],
          }
        });
        let consultas = temporadas.map((item, indexTemporadas) => {
          return this.http.get(API_URL + '/' + item.season + '/constructors/' + item.constructor.constructorId + '/drivers.json')
        });
        forkJoin(consultas).subscribe(data => {
          let pilotosTemporada = data.map((item: any, index) => {
            return item.MRData.DriverTable.Drivers;
          });
          pilotosTemporada = pilotosTemporada.map(item => {
            return item.filter(item => item.driverId != id);
          });
          // console.log(pilotosTemporada);
          pilotosTemporada.map((item, index) => {
            temporadas[index].teamMates = item;
          })
          subject.next(temporadas);
        });
      });
    return subject.asObservable();
  }
}
