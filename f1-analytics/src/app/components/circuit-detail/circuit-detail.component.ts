import { Component, OnInit, ViewChild, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, Circuit, Result, getMes } from '../../services/utils';
import { CircuitsService } from '../../services/circuits/circuits.service';
import { ActivatedRoute } from '@angular/router';
import { DemonymsService } from '../../services/demonyms/demonyms.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  results;
  src;
  polemans;
  polemansReady = false;

  constructor(private route: ActivatedRoute, private circuitsService: CircuitsService,
    private demonymsService: DemonymsService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.circuitsService.getCircuitById(this.route.snapshot.paramMap.get('id'))
      .subscribe((circuit: Circuit) => {
        this.circuit = {
          ...circuit,
          countryCode: this.demonymsService.getCountryCodeByCountryName(circuit.Location.country),
        };

        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/view?key=AIzaSyDfMmKqfiQop5i6H_ZpXCRGuULlxyYJD94&center=${this.circuit.Location.lat},${this.circuit.Location.long}&zoom=14`);

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


        this.circuitsService.getWinnersAtThisCircuit(this.circuit)
          .subscribe(results => {
            console.log(results);
            this.results = results;
          });
        this.circuitsService.getPolemansAtThisCircuit(this.circuit)
          .subscribe(res => {
            this.polemans = res;
            console.log('POLE', this.polemans);
            this.polemansReady = true;
          });
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
        }
        this.MostSuccesfullDriver = {
          driver: maxEl,
          count: maxCount,
        }


        maxEl = ConstructorWins[0],
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
        }

        this.MostSuccesfullConstructor = {
          constructor: maxEl,
          count: maxCount,
        };
      });
  }
}
