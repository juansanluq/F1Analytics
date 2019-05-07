import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, forkJoin } from 'rxjs';
import { ConstructorsService } from '../../services/constructors/constructors.service';
import { Driver } from 'src/app/services/utils';

@Component({
  selector: 'app-constructor-detail',
  templateUrl: './constructor-detail.component.html',
  styleUrls: ['./constructor-detail.component.scss']
})
export class ConstructorDetailComponent implements OnInit {

  nationality: Observable<string>;
  parametro: string;
  selectedConstructor: Observable<any>;

  constructorDrivers: Observable<any>;

  winsCount: Observable<any>;
  winPercentage: Observable<any>;

  racesCount: Observable<any>;

  polesCount: Observable<any>;
  polesPercentage: Observable<any>;

  seasonCount: Observable<any>;

  driverChampionshipsCount: Observable<any>;
  driverChampionshipPercentage: Observable<any>;

  constructorChampionshipsCount: Observable<any>;
  constructorChampionshipsPercentage: Observable<any>;

  constructorImage: Observable<any>;
  constructorInfo: Observable<any>;

  constructor(private route: ActivatedRoute, private constructorsService: ConstructorsService) { }

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.nationality = this.constructorsService.getNationalityByConstructorID(this.parametro);
    this.selectedConstructor = this.constructorsService.getConstructorByID(this.parametro);
    this.constructorDrivers = this.constructorsService.getCurrentDriversByConstructorID(this.parametro);
    this.winsCount = this.constructorsService.getVictoriesCountByConstructorID(this.parametro);
    this.winPercentage = this.getWinPercentage();
    this.racesCount = this.constructorsService.getRacesCountByConstructorID(this.parametro);
    this.polesCount = this.constructorsService.getPolesCountByConstructorID(this.parametro);
    this.polesPercentage = this.getPolePercentage();

    this.seasonCount = this.constructorsService.getSeasonCountByConstructorID(this.parametro);
    this.driverChampionshipsCount = this.constructorsService.getDriverChampionshipsCountByConstructorID(this.parametro);
    this.driverChampionshipPercentage = this.getDriverChampionshipPercentage();
    this.constructorChampionshipsCount = this.constructorsService.getConstructorChampionshipsCountByConstructorID(this.parametro);
    this.constructorChampionshipsPercentage = this.getConstructorChampionshipsPercentage();


    this.selectedConstructor.subscribe(res => {
      this.constructorImage = this.constructorsService.getConstructorImage(res.name);
      this.constructorInfo = this.constructorsService.getConstructorInfo(res);
    });
  }

  getWinPercentage() {
    const percentage = new Subject();
    this.winsCount.subscribe(winsCount => {
      this.racesCount.subscribe(racesCount => {
        percentage.next(Math.round((winsCount * 100) / racesCount));
      });
    });
    return percentage.asObservable();
  }

  getPolePercentage() {
    const percentage = new Subject();
    this.polesCount.subscribe(polesCount => {
      this.racesCount.subscribe(racesCount => {
        percentage.next(Math.round((polesCount * 100) / racesCount));
      });
    });
    return percentage.asObservable();
  }

  getDriverChampionshipPercentage() {
    const percentage = new Subject();
    this.seasonCount.subscribe(seasonCount => {
      this.driverChampionshipsCount.subscribe(dcCount => {
        percentage.next(Math.round((dcCount * 100) / seasonCount));
      });
    });
    return percentage.asObservable();
  }

  getConstructorChampionshipsPercentage() {
    const percentage = new Subject();
    this.seasonCount.subscribe(seasonCount => {
      this.constructorChampionshipsCount.subscribe(ccCount => {
        percentage.next(Math.round((ccCount * 100) / seasonCount));
      });
    });
    return percentage.asObservable();
  }
}
