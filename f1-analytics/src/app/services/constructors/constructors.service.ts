import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Constructor, API_URL } from '../utils';
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
        console.log(res.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
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
}
