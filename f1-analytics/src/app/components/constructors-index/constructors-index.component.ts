import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ConstructorsService } from '../../services/constructors/constructors.service';
import { Observable } from 'rxjs';
import { Constructor } from 'src/app/services/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

@Component({
  selector: 'app-constructors-index',
  templateUrl: './constructors-index.component.html',
  styleUrls: ['./constructors-index.component.scss']
})
export class ConstructorsIndexComponent implements OnInit, AfterViewInit {

  currentConstructors: Observable<any[]>;
  constructors;
  iniciales;

  constructor(private constructorsService: ConstructorsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.currentConstructors = this.constructorsService.getCurrentConstructors();
    this.constructorsService.getAllConstructors();
    this.constructorsService.getAllConstructors()
      .subscribe(constructors => {
        this.constructors = constructors;
        console.log(this.constructors);
        this.iniciales = this.constructorsService.getFirtCharacterOfConstructorsArray(constructors);
        setTimeout(() => {
          this.spinner.hide();
          enableBodyScroll();
        }, 5000);
      })
    const video = <HTMLVideoElement>document.getElementById('video');
    video.muted = true;
    video.autoplay = true;
  }

  ngAfterViewInit() {
    this.spinner.show();
    disableBodyScroll();
  }

}
