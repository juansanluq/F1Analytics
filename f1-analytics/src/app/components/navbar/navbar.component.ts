import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DriversService } from '../../services/drivers/drivers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  esMovil = false;
  esOrdenador = false;
  displayed = false;
  currentDrivers;

  constructor(private deviceService: DeviceDetectorService, private driversService: DriversService,
    private router: Router) { }

  ngOnInit() {
    let ul = document.getElementById('main-ul');
    let toggle = document.getElementById('toggle');

    if (this.deviceService.isMobile()) {
      this.esMovil = true;
      ul.style.display = 'none';
    } else if (!this.deviceService.isMobile()) {
      this.esOrdenador = true;
    }

    toggle.addEventListener('click', e => {
      if (!this.displayed) {
        ul.style.display = 'flex';
        this.displayed = true;
      } else if (this.displayed) {
        ul.style.display = 'none';
        this.displayed = false;
      }
    });
  }

  goToCircuits() {
    this.router.navigateByUrl('/circuitos');
  }

  goToIndex() {
    this.router.navigateByUrl('');
  }

  goToConstructors() {
    this.router.navigateByUrl('/constructores');
  }

  goToDrivers() {
    this.router.navigateByUrl('/pilotos');
  }

  goToSeasons() {
    this.router.navigateByUrl('/temporadas');
  }

}
