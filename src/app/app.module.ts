import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { WalkRouteService } from './services/walk-route-service';
import { components } from './components';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    components
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [WalkRouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
