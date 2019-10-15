import { Directive, OnInit, Input, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { RouteLocation } from '../models/walk-route.model';

import 'googlemaps';

@Directive({
  selector: '[appRouteMap]'
})
export class RouteMapDirective implements AfterViewInit {
  @Input() origin: RouteLocation;
  @Input() destination: RouteLocation;
  @Input() locations: RouteLocation[];

  private directionsRenderer: any;
  private waypoints;
  constructor(private mapsService: GoogleMapsAPIWrapper) {}

  ngAfterViewInit() {
    this.drawDirectionsRoute();
    this.waypoints = this.locations.map(({ latitude, longitude }) => ({
      location: new google.maps.LatLng(latitude, longitude),
      stopover: false
    }));
  }

  drawDirectionsRoute() {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.mapsService.getNativeMap().then(map => {
      const directionService = new google.maps.DirectionsService();
      directionService.set(map);
      directionService.route(
        {
          origin: { lat: this.origin.latitude, long: this.origin.longitude },
          destination: {
            lat: this.destination.latitude,
            long: this.destination.longitude
          },
          travelMode: 'WALKING'
          // waypoints: this.waypoints
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
          } else {
            console.log(`Cannot load directions because ${response} `);
          }
        }
      );
    });
  }
}

// https://www.leonelngande.com/directive-to-render-google-maps-direction-route-in-angular/
// drawDirectionsRoute() {
//   this.gmapsApi.getNativeMap().then(map => {
//     if (!this.directionsRenderer) {
//       // if you already have a marker at the coordinate location on the map, use suppressMarkers option
//       // suppressMarkers prevents google maps from automatically adding a marker for you
//       this.directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
//     }
//     const directionsRenderer = this.directionsRenderer;

//     if ( this.showDirection && this.destination ) {
//         const directionsService = new google.maps.DirectionsService;
//         directionsRenderer.setMap(map);
//         directionsService.route({
//             origin: {lat: this.origin.latitude, lng: this.origin.longitude},
//             destination: {lat: this.destination.latitude, lng: this.destination.longitude},
//             waypoints: [],
//             optimizeWaypoints: true,
//             travelMode: 'DRIVING'
//         }, (response, status) => {
//             if (status === 'OK') {
//                 directionsRenderer.setDirections(response);
//                 // If you'll like to display an info window along the route
//                 // middleStep is used to estimate the midpoint on the route where the info window will appear
//                 // const middleStep = (response.routes[0].legs[0].steps.length / 2).toFixed();
//                 // const infowindow2 = new google.maps.InfoWindow();
//                 // infowindow2.setContent(`${response.routes[0].legs[0].distance.text} <br> ${response.routes[0].legs[0].duration.text}  `);
//                 // infowindow2.setPosition(response.routes[0].legs[0].steps[middleStep].end_location);
//                 // infowindow2.open(map);
//             } else {
//                 console.log('Directions request failed due to ' + status);
//             }
//         });
//     }

//   });
