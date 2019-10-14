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
  noOfTreats: number = 0;
  walkRoute: WalkRoute;

  constructor(private route: ActivatedRoute, private routeService: WalkRouteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.routeService.getRoute(id).subscribe(routeDetails => {
        this.calculateTreats(routeDetails);
        this.walkRoute = routeDetails;
      })
    })
    
  }

  calculateTreats = ({ locations }: WalkRoute) => {
    locations.map(location => location.altitude).forEach((altitude, index) => {
        if (index > 0) {          
          const prevValue = locations[index - 1].altitude;
          const diff = altitude - prevValue;           
          if (altitude < prevValue) {
            if(diff < 0) this.noOfTreats +=  diff
            else this.noOfTreats -= diff
            
          } else if (altitude > prevValue) {
            if(diff < 0) this.noOfTreats -= diff
            else this.noOfTreats += diff
          }
        }
      });
  }
}
