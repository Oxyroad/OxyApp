import { Component, OnInit } from '@angular/core';
import { Pipe,PipeTransform} from '@angular/core';
import { LineService } from './line.service';


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
    lat: string;
    lng: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [LineService]
})
export class TransportComponent {
    lines: string[] = [];
    coords = [[20.9299259,52.2918205], [21.0600204,52.2584953], 
              [21.004961,52.2199554]]
    selectedLine: string;

    directionsService = new google.maps.DirectionsService();

    public onSelect(line: string): void {
        this.selectedLine = line;
        this.drawRoute(line);
    }

    getLines(): void {
        this.lineService
        .getLines()
        .then(lines => this.lines = lines);
    }

    getRoute(line: string): LatLng[] {
        return this.lineService.getRoute(line).then(route => route);
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
    drawRoute(line: string): string {
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            preserveViewport: true,
            markerOptions: { visible: false}
        });
        var route = getRoute();

        this.directionsService.route({
            origin: new google.maps.LatLng(52.2848927,20.9315048),
            destination: new google.maps.LatLng(52.2811923,20.9480793),
            waypoints: [{
                stopover: false,
                location: new google.maps.LatLng(52.2858283,20.9380713)
            }],
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            console.log(response);
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
        }});
   }
}
