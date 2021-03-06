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
import { FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CircuitsIndexComponent } from './components/circuits-index/circuits-index.component';
import { RouterModule } from '@angular/router';
import { CircuitDetailComponent } from './components/circuit-detail/circuit-detail.component';

import { AgmCoreModule } from '@agm/core';
import { ConstructorsIndexComponent } from './components/constructors-index/constructors-index.component';
import { ConstructorDetailComponent } from './components/constructor-detail/constructor-detail.component';

import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DriversIndexComponent } from './components/drivers-index/drivers-index.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeasonsIndexComponent } from './components/seasons-index/seasons-index.component';
import { SeasonDetailComponent } from './components/season-detail/season-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    DotdComponent,
    NewsComponent,
    FooterComponent,
    CircuitsIndexComponent,
    CircuitDetailComponent,
    ConstructorsIndexComponent,
    ConstructorDetailComponent,
    DriversIndexComponent,
    DriverDetailComponent,
    SeasonsIndexComponent,
    SeasonDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ChartsModule,
    NgxSpinnerModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
