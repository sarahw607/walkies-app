import { Component, Input, OnInit } from '@angular/core';
import { RouteLocation } from 'src/app/models/walk-route.model';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements OnInit {
  @Input() locations: RouteLocation[];
  origin: RouteLocation;
  destination: RouteLocation;
  wayPoints: RouteLocation[];

  constructor() {}

  ngOnInit() {
    const lastIndex = this.locations.length - 1;
    this.origin = this.locations[0];
    this.destination = this.locations[lastIndex];
    this.wayPoints = this.locations.slice(1, lastIndex);
  }
}
