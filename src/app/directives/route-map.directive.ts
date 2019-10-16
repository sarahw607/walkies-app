import { Directive, Input, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader, LatLng } from '@agm/core';
import { RouteLocation } from '../models/walk-route.model';

@Directive({
  selector: '[appRouteMap]'
})
export class RouteMapDirective implements AfterViewInit {
  @Input() origin: RouteLocation;
  @Input() destination: RouteLocation;
  @Input() midLocations: RouteLocation[];

  private directionsRenderer: any;
  private waypoints;
  constructor(
    private mapsService: GoogleMapsAPIWrapper,
    private mapsApiLoader: MapsAPILoader
  ) {}

  ngAfterViewInit() {
    this.drawRoute();
    this.waypoints = this.midLocations.map(({ latitude, longitude }) => ({
      location: { lat: latitude, lng: longitude },
      stopover: true
    }));
  }

  drawRoute() {
    this.mapsApiLoader.load().then(() => {
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.mapsService.getNativeMap().then(map => {
        const directionService = new google.maps.DirectionsService();
        this.directionsRenderer.setMap(map);
        directionService.route(
          {
            origin: { lat: this.origin.latitude, lng: this.origin.longitude },
            destination: {
              lat: this.destination.latitude,
              lng: this.destination.longitude
            },
            travelMode: google.maps.TravelMode.WALKING,
            waypoints: this.waypoints
          },
          (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.directionsRenderer.setDirections(response);
            } else {
              console.log(`Cannot load directions because ${response} `);
            }
          }
        );
      });
    });
  }
}
