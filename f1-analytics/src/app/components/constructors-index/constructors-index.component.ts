import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConstructorsService } from '../../services/constructors/constructors.service';
import { Observable } from 'rxjs';
import { Constructor } from 'src/app/services/utils';

@Component({
  selector: 'app-constructors-index',
  templateUrl: './constructors-index.component.html',
  styleUrls: ['./constructors-index.component.scss']
})
export class ConstructorsIndexComponent implements OnInit {

  currentConstructors: Observable<any[]>;
  constructors;
  iniciales;

  constructor(private constructorsService: ConstructorsService) { }

  ngOnInit() {
    this.currentConstructors = this.constructorsService.getCurrentConstructors();
    this.constructorsService.getAllConstructors();
    this.constructorsService.getAllConstructors()
      .subscribe(constructors => {
        this.constructors = constructors;
        console.log(this.constructors);
        this.iniciales = this.constructorsService.getFirtCharacterOfConstructorsArray(constructors);
      })
    const video = <HTMLVideoElement>document.getElementById('video');
    video.muted = true;
    video.autoplay = true;
  }

}
