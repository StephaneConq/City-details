import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  // check if api is loaded for map display
  apiLoaded: Observable<boolean>;
  // resolve function when map is loaded
  resolveMap: any;
  // reject function if map can't be loaded
  rejectMap: any;
  // map promise
  mapPromise = new Promise((resolve, reject) => {
    this.resolveMap = resolve;
    this.rejectMap = reject;
  });
  // new viewport for map bounds
  // @ts-ignore
  newViewport = new BehaviorSubject<google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined>();

  constructor(httpClient: HttpClient) {
    // get maps js lib
    // by using this way, we avoid adding it in the index.html file with the API key
    // and therefore displaying it publicly (eventhough the key is restricted by domain and APIs)
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.mapsKey}&libraries=places`, 'callback')
      .pipe(
        map(() => {
          // resolve map promise
          this.resolveMap();
          return true;
        }),
        catchError(() => {
          // reject map promise
          this.rejectMap();
          return of(false);
        }),
      );
  }
}
