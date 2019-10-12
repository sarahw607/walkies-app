import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()                        
export class WalkRouteService {

    constructor(private http: HttpClient){}
    
getRoutes = () => this.http.get(environment.apiUrl)

}