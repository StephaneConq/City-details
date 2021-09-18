import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeoResult} from "../models/geo-result";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GeoapiService {

  constructor(
    private http: HttpClient
  ) { }

  getDataFromCoordinates(cityName: string): Observable<GeoResult[]> {
    // Use Government API to get details for a city
    // @ts-ignore
    return this.http.get(`https://geo.api.gouv.fr/communes?nom=${cityName}&format=json&geometry=centre`);
  }
}
