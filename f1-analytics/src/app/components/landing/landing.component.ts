import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Observable } from 'rxjs';
import { gp } from 'src/app/services/utils';
import wiki from 'wikijs';
import { HttpClient } from '@angular/common/http';
import { DemonymsService } from 'src/app/services/demonyms/demonyms.service';
import { DriversService } from 'src/app/services/drivers/drivers.service';
import { driver } from '../../services/utils';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    nextGP;
    nextGPready = false;
    days;
    hours;
    minutes;
    seconds;

    lastGP;
    lastGPready = false;
    currentDate = new Date();
    currentDrivers;

    constructor(private scheduleService: ScheduleService, private http: HttpClient,
        private demonymService: DemonymsService, private driversService: DriversService) { }

    ngOnInit() {
        this.scheduleService.getNextGP()
            .subscribe(nextGP => {
                this.nextGP = nextGP;
                this.nextGPready = true;

                this.startGPCountdown();
            });

        this.scheduleService.getLastGP()
            .subscribe(lastGP => {
                this.lastGP = lastGP;
                this.lastGP.Circuit.Location = {
                    ...this.lastGP.Circuit.Location,
                    countryCode: this.demonymService.getCountryCodeByCountryName(this.lastGP.Circuit.Location.country),
                }

                let driverWithCountryCode;

                for (let i = 0; i < this.lastGP.Results.length; i++) {
                    driverWithCountryCode = {
                        ...this.lastGP.Results[i].Driver,
                        countryCode: this.demonymService.getCountryCode(this.lastGP.Results[i].Driver.nationality)
                    };
                    this.lastGP.Results[i].Driver = driverWithCountryCode;
                }

                this.lastGPready = true;
            });
    }

    startGPCountdown() {
        const countDownDate = this.nextGP.real_date.getTime();
        let x = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    }
}
