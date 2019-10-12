import { Component, OnInit } from '@angular/core';
import { WalkRouteService } from './services/walk-route-service';
import { WalkRoute } from './models/walk-route.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private routesService: WalkRouteService) {}
  walkRoutes: WalkRoute[]
  title = 'walkies-app';

  ngOnInit(){
    // TODO unsubscribe
    this.routesService.getRoutes().subscribe(data => { this.walkRoutes = data; console.log(data)} );
  }
}
