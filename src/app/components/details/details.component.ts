import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {LatLng} from "../../models/lat-lng";
import {CityService} from "../../services/city.service";
import {GeoapiService} from "../../services/geoapi.service";
import {GeoResult} from "../../models/geo-result";
import {MapsService} from "../../services/maps.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  city: GeoResult | null = null;

  constructor(
    private cityService: CityService,
    private geoService: GeoapiService,
    private changeDetector: ChangeDetectorRef,
    private mapsService: MapsService
  ) { }

  ngOnInit(): void {
    this.cityService.selectedCityName.subscribe(cityName => {
      if (!cityName) {
        return;
      }
      this.city = null;
      // get details from city name
      this.geoService.getDataFromCoordinates(cityName).subscribe((res: GeoResult[]) => {
        // find city with exact same name
        const city = res.find(r => r.nom === cityName);
        if (city) {
          // if city found, display
          this.city = city;
          this.changeDetector.detectChanges();
        } else {
          // else console error
          console.error(`City not found ${cityName}`);
          console.log(`in ${res}`);
        }
        // stop loading
      }, error => {
        console.error(error);
      })
    })
  }

  close() {
    // remove selected city
    this.cityService.selectedCityName.next(null);
    // remove selected viewport
    this.mapsService.newViewport.next(undefined);
    // trigger rerender
    this.changeDetector.detectChanges();
  }

}
