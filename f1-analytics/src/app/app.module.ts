import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { LandingComponent } from './components/landing/landing.component';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { HttpClientModule } from '@angular/common/http';
import { DotdComponent } from './components/dotd/dotd.component';
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    DotdComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
