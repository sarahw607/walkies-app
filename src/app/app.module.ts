import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { WalkRouteService } from './services/walk-route-service';
import { components } from './components';
import { CommonModule } from '@angular/common';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteDetailComponent } from './components/route-detail/route-detail.component';
import { RouteMapDirective } from './directives/route-map.directive';

const appRoutes: Routes = [
  { path: 'route-details/:id', component: RouteDetailComponent },
  { path: 'routes', component: RouteListComponent },
  { path: '', redirectTo: '/routes', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    components,
    RouteListComponent,
    RouteDetailComponent,
    RouteMapDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBp7-48qKl3mat1o4U5zDMP_oLwY2alq8M'
    })
  ],
  providers: [WalkRouteService, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule {}
