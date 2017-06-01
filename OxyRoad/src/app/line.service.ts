import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {LatLng} from './app.component';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class LineService {
  linesUrl = 'http://46.101.164.201:5000/api/lines'
  routeUrl = 'http://46.101.164.201:5000/api/route/'
  serviceData: any;
  getLines(): Promise<string[]> {
      return this.http.get(this.linesUrl)
               .toPromise()
               .then(response => response.json()['lines'] as string[])
               .catch(this.handleError);
  }

  getRoute(line: string): Observable<LatLng[]> {
      return this.http.get(this.routeUrl + line).map(res => res.json()['route'])
               .catch(this.handleError);
  }
  
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}
