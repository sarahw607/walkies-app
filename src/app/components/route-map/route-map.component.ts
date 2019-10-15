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
  routeLocations: RouteLocation[];

  constructor() {}

  ngOnInit() {
    const lastIndex = this.locations.length - 1;
    this.origin = this.locations[0];
    this.destination = this.locations[lastIndex];
    this.routeLocations = this.locations.filter(
      (location, index) => index !== 0 && index !== lastIndex
    );
    console.log(this.origin);
    console.log(this.destination);
    console.log(this.routeLocations);
  }
}
