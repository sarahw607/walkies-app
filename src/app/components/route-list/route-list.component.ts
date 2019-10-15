import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalkRoute } from 'src/app/models/walk-route.model';
import { WalkRouteService } from 'src/app/services/walk-route-service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit, OnDestroy {

  constructor(private routesService: WalkRouteService) {}
  walkRoutes: WalkRoute[]
  private isAlive = true;

  ngOnInit() {
    this.routesService.getRoutes().pipe(takeWhile(() => this.isAlive)).subscribe(data => { this.walkRoutes = data; console.log(data)} );
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}
