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

  calculateTreats = ({ locations }: WalkRoute) => {
    console.log(locations);
   this.noOfTreats = locations.reduce((total, {altitude}, index, values) => {
     if(index === 0){
      return altitude;
     }else{
       console.log('index' + index);
      let prevValue = values[index-1];
       console.log(prevValue)
      if(altitude > prevValue.altitude) { return altitude - prevValue.altitude }
      else if(altitude < prevValue.altitude) { return -altitude}
      else return 0
     }
    }, 0);
  }
}
