import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { RouteLocation, WalkRoute } from 'src/app/models/walk-route.model';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements AfterViewChecked {
  @Input() walkRoute: WalkRoute

  constructor() { }

  ngAfterViewChecked() {
    
  }

}
