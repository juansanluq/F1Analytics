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
  drivers = [
    {
      'id': 'albon',
      'nombre': 'Alexander',
      'apellido': 'ALBON',
      'color': 'toro_rosso'
    },
    {
      'id': 'bottas',
      'nombre': 'Valtteri',
      'apellido': 'BOTTAS',
      'color': 'mercedes'
    },
    {
      'id': 'gasly',
      'nombre': 'Pierre',
      'apellido': 'GASLY',
      'color': 'red_bull'
    },
    {
      'id': 'giovinazzi',
      'nombre': 'Antonio',
      'apellido': 'GIOVINAZZI',
      'color': 'alfa'
    },
    {
      'id': 'grosjean',
      'nombre': 'Romain',
      'apellido': 'GROSJEAN',
      'color': 'haas'
    },
    {
      'id': 'hamilton',
      'nombre': 'Lewis',
      'apellido': 'HAMILTON',
      'color': 'mercedes'
    },
    {
      'id': 'hulkenberg',
      'nombre': 'Nico',
      'apellido': 'HÜLKENBERG',
      'color': 'renault'
    },
    {
      'id': 'kubica',
      'nombre': 'Robert',
      'apellido': 'KUBICA',
      'color': 'williams'
    },
    {
      'id': 'kvyat',
      'nombre': 'Daniil',
      'apellido': 'KVYAT',
      'color': 'toro_rosso'
    },
    {
      'id': 'leclerc',
      'nombre': 'Charles',
      'apellido': 'LECLERC',
      'color': 'ferrari'
    },
    {
      'id': 'kevin_magnussen',
      'nombre': 'Kevin',
      'apellido': 'MAGNUSSEN',
      'color': 'haas'
    },
    {
      'id': 'norris',
      'nombre': 'Lando',
      'apellido': 'NORRIS',
      'color': 'mclaren'
    },
    {
      'id': 'perez',
      'nombre': 'Sergio',
      'apellido': 'PEREZ',
      'color': 'racing_point'
    },
    {
      'id': 'raikkonen',
      'nombre': 'Kimi',
      'apellido': 'RAIKKONEN',
      'color': 'alfa'
    },
    {
      'id': 'ricciardo',
      'nombre': 'Daniel',
      'apellido': 'RICCIARDO',
      'color': 'renault'
    },
    {
      'id': 'russell',
      'nombre': 'George',
      'apellido': 'RUSSELL',
      'color': 'williams'
    },
    {
      'id': 'sainz',
      'nombre': 'Carlos',
      'apellido': 'SAINZ',
      'color': 'mclaren'
    },
    {
      'id': 'stroll',
      'nombre': 'Lance',
      'apellido': 'STROLL',
      'color': 'racing_point'
    },
    {
      'id': 'max_verstappen',
      'nombre': 'Max',
      'apellido': 'VERSTAPPEN',
      'color': 'red_bull'
    },
    {
      'id': 'vettel',
      'nombre': 'Sebastian',
      'apellido': 'VETTEL',
      'color': 'ferrari'
    },
  ]

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
