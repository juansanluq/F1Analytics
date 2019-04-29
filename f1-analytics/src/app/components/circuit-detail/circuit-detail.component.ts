import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, Circuit, Result } from '../../services/utils';
import { CircuitsService } from '../../services/circuits/circuits.service';
import { ActivatedRoute } from '@angular/router';
import { DemonymsService } from '../../services/demonyms/demonyms.service';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.component.html',
  styleUrls: ['./circuit-detail.component.scss']
})
export class CircuitDetailComponent implements OnInit {

  circuit;
  circuitImage;
  gpCount;
  firstYear;
  lastYear;
  MostSuccesfullDriver;
  MostSuccesfullConstructor;
  extendedInfo;

  constructor(private route: ActivatedRoute, private circuitsService: CircuitsService,
    private demonymsService: DemonymsService) { }

  ngOnInit() {
    this.circuitsService.getCircuitById(this.route.snapshot.paramMap.get('id'))
      .subscribe((circuit: Circuit) => {
        this.circuit = {
          ...circuit,
          countryCode: this.demonymsService.getCountryCodeByCountryName(circuit.Location.country),
        };
        this.circuitsService.getCircuitImage(this.circuit)
          .subscribe(image => {
            this.circuitImage = image;
          });
        this.circuitsService.getRacesByCircuit(circuit)
          .subscribe((res: any) => {
            this.gpCount = res.MRData.RaceTable.Races.length;
            this.firstYear = res.MRData.RaceTable.Races[0].season;
            this.lastYear = res.MRData.RaceTable.Races[res.MRData.RaceTable.Races.length - 1].season;
          });
        this.setMostSuccesfullDriverAndConstructor();
        this.circuitsService.getInfo(circuit)
          .subscribe((res: any) => this.extendedInfo = res.extract);
      });
  }

  setMostSuccesfullDriverAndConstructor() {
    this.circuitsService.getWinnersByCircuit(this.circuit)
      .subscribe((res: any) => {
        let races = res.MRData.RaceTable.Races;
        let WinsDrivers = new Array();
        let ConstructorWins = new Array();
        for (const race of races) {
          WinsDrivers.push(race.Results[0].Driver);
          ConstructorWins.push(race.Results[0].Constructor);
        }
        let modeMap = {},
          maxEl = WinsDrivers[0],
          maxCount = 1;

        for (var i = 0; i < WinsDrivers.length; i++) {
          var el = WinsDrivers[i].driverId;

          if (modeMap[el] == null)
            modeMap[el] = 1;
          else
            modeMap[el]++;

          if (modeMap[el] > maxCount) {
            maxEl = WinsDrivers[i];
            maxCount = modeMap[el];
          }
          else if (modeMap[el] == maxCount) {
            maxEl += '&' + el;
            maxCount = modeMap[el];
          }
        }
        this.MostSuccesfullDriver = {
          driver: maxEl,
          count: maxCount,
        }

        // Reiniciamos las variables
        maxEl = ConstructorWins[0];
        maxCount = 1;

        for (var i = 0; i < ConstructorWins.length; i++) {
          var el = ConstructorWins[i].name;

          if (modeMap[el] == null)
            modeMap[el] = 1;
          else
            modeMap[el]++;

          if (modeMap[el] > maxCount) {
            maxEl = ConstructorWins[i];
            maxCount = modeMap[el];
          }
          else if (modeMap[el] == maxCount) {
            maxEl += '&' + el;
            maxCount = modeMap[el];
          }
        }

        this.MostSuccesfullConstructor = {
          constructor: maxEl,
          count: maxCount,
        }

        console.log(maxEl);
      });
  }
}
