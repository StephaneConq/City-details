import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MapsService} from "../../services/maps.service";
import {CityService} from "../../services/city.service";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  cityIsSelected = false;

  constructor(
    private mapService: MapsService,
    private cityService: CityService,
    private changeDetection: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {

    this.cityService.selectedCityName.subscribe(value => {
      // if selected city, then city displayed, then move searchbar to the right
      this.cityIsSelected = !!value;
      // trigger rerender
      this.changeDetection.detectChanges();
    });

    // wait for Google maps to load
    await this.mapService.mapPromise;
    // set up options
    const options = {
      types: ["(cities)"], // restrict to cities
      componentRestrictions: {country: "fr"} // only in France
    };

    // init autocomplete
    const autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('autocomplete'),
      options);

    // listen to autocomplete
    autocomplete.addListener("place_changed", () => {
      // get selected place
      const place = autocomplete.getPlace();
      // push newport
      this.mapService.newViewport.next(place.geometry?.viewport);
      // push city name
      this.cityService.selectedCityName.next(place.name);
    });
  }

}
