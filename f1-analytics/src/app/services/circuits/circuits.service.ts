import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, Circuit } from '../utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  constructor(private http: HttpClient) { }

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

  getFirtCharacterOfCircuitsArray(circuitos: Circuit[]) {
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
}
