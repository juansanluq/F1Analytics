import { Injectable } from '@angular/core';
import { countryList } from '../utils';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemonymsService {

  countries = countryList;

  constructor() { }

  getCountryCode(demonym: string) {
    let countryCode;
    for (let i = 0; i < this.countries.length; i++) {
      if (demonym === this.countries[i][3]) {
        countryCode = this.countries[i][0];
        break;
      }
    }
    return countryCode;
  }

  getCountryCodeByCountryName(countryName: string) {
    let countryCode;
    for (let i = 0; i < this.countries.length; i++) {
      if (countryName === this.countries[i][1]) {
        countryCode = this.countries[i][0];
        break;
      }
    }
    return countryCode;
  }
}
