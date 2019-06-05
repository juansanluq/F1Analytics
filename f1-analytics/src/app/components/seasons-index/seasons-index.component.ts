import { Component, OnInit } from '@angular/core';
import { SeasonsService } from '../../services/seasons/seasons.service';
import { Observable } from 'rxjs';
import { DriversService } from '../../services/drivers/drivers.service';

@Component({
  selector: 'app-seasons-index',
  templateUrl: './seasons-index.component.html',
  styleUrls: ['./seasons-index.component.scss']
})
export class SeasonsIndexComponent implements OnInit {

  temporadas: Observable<any>;

  constructor(private seasons: SeasonsService) { }

  ngOnInit() {
    this.temporadas = this.seasons.getSeasonsList();
  }

}
