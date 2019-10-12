import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalkRoute } from '../models/walk-route.model';


@Injectable()                        
export class WalkRouteService {

    constructor(private http: HttpClient){}
    
getRoutes = () => this.http.get<WalkRoute[]>(environment.apiUrl);

}