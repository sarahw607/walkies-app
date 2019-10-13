import { Component, OnInit, Input } from '@angular/core';
import { RouteLocation } from 'src/app/models/walk-route.model';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements OnInit {
  @Input() locations: RouteLocation[]

  constructor() { }

  ngOnInit() {
  }

}
