import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CircuitsIndexComponent } from './components/circuits-index/circuits-index.component';
import { AppComponent } from './app.component';
import { CircuitDetailComponent } from './components/circuit-detail/circuit-detail.component';
import { ConstructorsIndexComponent } from './components/constructors-index/constructors-index.component';
import { ConstructorDetailComponent } from './components/constructor-detail/constructor-detail.component';
import { DriversIndexComponent } from './components/drivers-index/drivers-index.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'circuitos', component: CircuitsIndexComponent },
  { path: 'circuitos/:id', component: CircuitDetailComponent },
  { path: 'constructores', component: ConstructorsIndexComponent },
  { path: 'constructores/:id', component: ConstructorDetailComponent },
  { path: 'pilotos', component: DriversIndexComponent },
  { path: 'pilotos/:id', component: DriverDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
