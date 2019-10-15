import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WalkRoute, RouteLocation } from 'src/app/models/walk-route.model';
import { ActivatedRoute } from '@angular/router';
import { WalkRouteService } from 'src/app/services/walk-route-service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html'
})
export class RouteDetailComponent implements OnInit, OnDestroy {

  noOfTreats = 0;
  walkRoute: WalkRoute;
  private isAlive = true;

  constructor(
    private route: ActivatedRoute,
    private routeService: WalkRouteService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.routeService.getRoute(id).pipe(takeWhile(() => this.isAlive)).subscribe(routeDetails => {
        this.calculateTreats(routeDetails);
        this.walkRoute = routeDetails;
      });
    });
  }

  calculateTreats({ locations }: WalkRoute) {
    locations
      .map(location => location.altitude)
      .forEach((altitude, index) => {
        if (index > 0) {
          const prevValue = locations[index - 1].altitude;
          const diff = altitude - prevValue;
          if (altitude < prevValue) {
            if (diff < 0) {
              this.noOfTreats += diff;
            } else {
              this.noOfTreats -= diff;
            }
          } else if (altitude > prevValue) {
            if (diff < 0) {
              this.noOfTreats -= diff;
            } else {
              this.noOfTreats += diff;
            }
          }
        }
      });
  };

  ngOnDestroy() {
    this.isAlive = false;
  }
}