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

export class LatLng {
    constructor(lat: number, lng: number){}
    lat: number;
    lng: number;
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
    search_value = "";
    coords = [[20.9299259,52.2918205], [21.0600204,52.2584953], 
              [21.004961,52.2199554]]
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
         this.lineService.getRoute(line).subscribe(values => { 
            this.route = values;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map,
                preserveViewport: true,
                markerOptions: { visible: false}
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
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
            }});
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
        console.log(this.route);

        

        console.log(this.route);
   }
}
