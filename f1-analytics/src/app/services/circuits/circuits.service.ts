import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, Circuit, getMes } from '../utils';
import { Subject } from 'rxjs';
import { DemonymsService } from '../demonyms/demonyms.service';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  constructor(private http: HttpClient, private demonyms: DemonymsService) { }

  getAllCircuits() {
    return this.http.get(API_URL + '/circuits.json?limit=80');
  }

  getAllCircuitsOrdered() {
    let subject = new Subject();
    this.getAllCircuits().subscribe((res: any) => {
      let circuitos = res.MRData.CircuitTable.Circuits;
      circuitos = circuitos.sort((a, b) => {
        let nameA = a.circuitName.toUpperCase();
        let nameB = b.circuitName.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
      subject.next(circuitos);
    });
    return subject.asObservable();
  }

  getFirstCharacterOfCircuitsArray(circuitos: Circuit[]) {
    let letras = new Array();
    let primeraLetra = '';
    for (const circuito of circuitos) {
      if (circuito.circuitName.charAt(0) != primeraLetra) {
        letras.push(circuito.circuitName.charAt(0));
        primeraLetra = circuito.circuitName.charAt(0);
      }
    }
    return letras;
  }

  getCircuitById(id: string) {
    let subject = new Subject();
    this.http.get(API_URL + '/circuits/' + id + '.json')
      .subscribe((res: any) => subject.next(res.MRData.CircuitTable.Circuits[0]));
    return subject.asObservable();
  }

  getCircuitImage(circuit: Circuit) {
    const searchTerm = circuit.url.split('/');
    let subject = new Subject();
    this.http.get('https://en.wikipedia.org/api/rest_v1/page/media/' + searchTerm[searchTerm.length - 1])
      .subscribe((res: any) => {
        subject.next(res.items[0].original.source);
      });
    return subject.asObservable();
  }

  getRacesByCircuit(circuit: Circuit) {
    return this.http.get(API_URL + '/circuits/' + circuit.circuitId + '/races.json?limit=1000');
  }

  getWinnersByCircuit(circuit: Circuit) {
    return this.http.get(API_URL + '/circuits/' + circuit.circuitId + '/results/1.json?limit=1000');
  }

  getInfo(circuit: Circuit) {
    const searchTerm = circuit.url.split('/');
    return this.http.get('https://es.wikipedia.org/api/rest_v1/page/summary/' + searchTerm[searchTerm.length - 1]);
  }

  getWinnersAtThisCircuit(circuit: Circuit) {
    let subject = new Subject();
    let results = new Array();
    this.http.get(API_URL + '/circuits/' + circuit.circuitId + '/results/1.json?limit=1000')
      .subscribe((data: any) => {
        let races = data.MRData.RaceTable.Races;
        for (const race of races) {
          results.push(race);
        }
        for (const result of results) {
          result.Results[0].Driver = {
            ...result.Results[0].Driver,
            givenName: result.Results[0].Driver.givenName.charAt(0) + '.',
            countryCode: this.demonyms.getCountryCode(result.Results[0].Driver.nationality),
          }
        }

        let gp_complete_date;
        // Añadimos el objecto Date a las carreras que nos traemos de la API
        for (let i = 0; i < results.length; i++) {
          let gp_date = results[i].date.split("-");
          let gp_year = gp_date[0];
          let gp_month = gp_date[1];
          let gp_day = gp_date[2];

          // Hay que restarle 1 al mes, ya que al tipo Date los meses se le indican como un array index,
          // Por lo que por ejemplo Diciembre correspondería con el índice 11
          gp_complete_date = gp_day + ' ' + getMes(gp_month);
          results[i].formattedDate = gp_complete_date;
        }
        subject.next(results);
      });
    return subject.asObservable();
  }

  getPolemansAtThisCircuit(circuit: Circuit) {
    let subject = new Subject();
    let results = new Array();
    this.http.get(API_URL + '/grid/1/circuits/' + circuit.circuitId + '/results.json?limit=1000')
      .subscribe((data: any) => {
        let races = data.MRData.RaceTable.Races;
        for (const race of races) {
          results.push(race);
        }
        for (const result of results) {
          result.Results[0].Driver = {
            ...result.Results[0].Driver,
            givenName: result.Results[0].Driver.givenName.charAt(0) + '.',
            countryCode: this.demonyms.getCountryCode(result.Results[0].Driver.nationality),
          }
        }
        subject.next(results);
      });
    return subject.asObservable();
  }
}
