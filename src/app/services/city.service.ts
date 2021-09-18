import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  selectedCityName = new BehaviorSubject<string | null>(null);

  constructor() { }
}
