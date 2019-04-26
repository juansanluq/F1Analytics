import { Component, OnInit } from '@angular/core';
import { CircuitsService } from '../../services/circuits/circuits.service';
import { Circuit, Location } from '../../services/utils';
import { DemonymsService } from '../../services/demonyms/demonyms.service';

@Component({
  selector: 'app-circuits-index',
  templateUrl: './circuits-index.component.html',
  styleUrls: ['./circuits-index.component.scss']
})
export class CircuitsIndexComponent implements OnInit {

  circuits = new Array();
  letras;

  constructor(private circuitsService: CircuitsService, private demonymsService: DemonymsService) { }

  ngOnInit() {
    this.circuitsService.getAllCircuitsOrdered()
      .subscribe((circuits: Circuit[]) => {
        for (const circuit of circuits) {
          let circuitWithCountryCode;
          circuitWithCountryCode = {
            ...circuit,
            countryCode: this.demonymsService.getCountryCodeByCountryName(circuit.Location.country),
          }
          this.circuits.push(circuitWithCountryCode);
          console.log(circuitWithCountryCode);
        }
        this.letras = this.circuitsService.getFirtCharacterOfCircuitsArray(circuits);
        console.log(this.letras);
      });
  }

}
