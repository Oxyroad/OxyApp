import { Component, OnInit } from '@angular/core';
import { Pipe,PipeTransform} from '@angular/core';
import { LineService } from './line.service';

import { Observable } from 'rxjs/Observable';


declare var google: any;
var map: any;

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {
        return items.filter(item =>{
           if(item.indexOf(criteria) != -1){
                return true;
             }
           return false;
        });
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export class LatLng {
    constructor(lat: number, lng: number){}
    lat: number;
    lng: number;
}

export class RouteInfo {
    constructor(green_waypoints: LatLng[], route: LatLng[]){}
    green_waypoints: LatLng[];
    route: LatLng[];

}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [LineService]
})
export class TransportComponent {
    lines: string[] = [];
    route: LatLng[];
    green_waypoints: LatLng[];
    line_color: number[];
    search_value = "";
    selectedLine: string;

    directionsService = new google.maps.DirectionsService();

    public onSelect(line: string): void {
        this.search_value = line;
        this.selectedLine = line;
        this.drawRoute(line);
    }

    getLines(): void {
        this.lineService
        .getLines()
        .then(lines => this.lines = lines);
    }

    getRoute(line: string): void {
        this.lineService.getRoute(line).subscribe(routeInfo => { 
            this.route = routeInfo["route"];
            this.green_waypoints = routeInfo["green_waypoints"];
            this.line_color = routeInfo["color"];
            var hexColor = rgbToHex(this.line_color[0], this.line_color[1],this.line_color[2])
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map,
                preserveViewport: false,
                markerOptions: { visible: false},
                polylineOptions: {strokeColor: hexColor}
            });
        
            var waypoints = [];
            for(let i=1; i<this.route.length-1; i++){
                let point = this.route[i];
                waypoints.push({
                    stopover: false, 
                    location: new google.maps.LatLng(point.lat, point.lng)
                });
            }

            this.directionsService.route({
                origin: new google.maps.LatLng(this.route[0].lat, this.route[0].lng),
                destination: new google.maps.LatLng(this.route[this.route.length-1].lat,
                                                this.route[this.route.length-1].lng),
           
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
            }});

            for (let green_point of this.green_waypoints) {
                console.log(green_point);
                var greenCircle = new google.maps.Circle({
                    strokeColor: '#217c21',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#32CD32',
                    fillOpacity: 0.35,
                    map: map,
                    center: {lat: green_point.lat, lng: green_point.lng},
                    radius: 30 
                });
            }
        });
    }

    constructor(private lineService: LineService) {}
    ngOnInit() {
        this.getLines();
        var mapProp = {
            center: new google.maps.LatLng(52.2297, 21.0122),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    drawRoute(line: string): void {
        this.getRoute(line);
    }

}
