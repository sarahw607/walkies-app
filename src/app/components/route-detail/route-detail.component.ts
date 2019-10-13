import { Component, OnInit, Input } from '@angular/core';
import { WalkRoute, RouteLocation } from 'src/app/models/walk-route.model';
import { ActivatedRoute } from '@angular/router';
import { WalkRouteService } from 'src/app/services/walk-route-service';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
  noOfTreats: number;
  locations: RouteLocation[];

  constructor(private route: ActivatedRoute, private routeService: WalkRouteService) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const id = params['id'];
      this.routeService.getRoute(id).subscribe(routeDetails => {
        this.calculateTreats(routeDetails);
        this.locations = routeDetails.locations;
      })
    })
  }

  calculateTreats = (routeDetails: WalkRoute) => {
    console.log(routeDetails);
    this.noOfTreats = routeDetails.locations.reduce((acc, currentValue, prevValue) => {
      console.log(acc);
      console.log(currentValue);
      console.log(prevValue);
      return acc + currentValue.altitude;
    }, 0);
  }
}
