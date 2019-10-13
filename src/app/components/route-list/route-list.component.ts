import { Component, OnInit } from '@angular/core';
import { WalkRoute } from 'src/app/models/walk-route.model';
import { WalkRouteService } from 'src/app/services/walk-route-service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  constructor(private routesService: WalkRouteService) {}
  walkRoutes: WalkRoute[]

  ngOnInit() {
        // TODO unsubscribe
        this.routesService.getRoutes().subscribe(data => { this.walkRoutes = data; console.log(data)} );
  }

}
