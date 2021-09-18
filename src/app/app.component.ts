import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MapsService} from "./services/maps.service";
import {ModalService} from "./services/modal.service";
import {Modals} from "./config/config";
import {ModalAction} from "./models/modal-command";
import {GoogleMap} from "@angular/google-maps";
import {CityService} from "./services/city.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  mapOptions: any;
  // @ts-ignore
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  zoom = 6;
  center: any = null;
  displayDetails = false;

  constructor(
    public mapsService: MapsService,
    private modalService: ModalService,
    private cityService: CityService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  async ngOnInit(): Promise<void> {

    //display welcome modal (wait a bit not to be agressive)
    this.displayWelcomeModal();

    // wait for the map to load
    await this.mapsService.mapPromise;

    // init map
    this.initMap();

    this.mapsService.newViewport.subscribe((viewport: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined) => {
      if (!viewport) {
        // if no viewport, close details
        this.displayDetails = false;
        // trigger rerender
        this.changeDetector.detectChanges();
        return;
      }
      // create bounds
      const bounds = new google.maps.LatLngBounds();
      // add viewport to bounds
      bounds.union(viewport);
      // make map fit bounds
      this.map.fitBounds(bounds);
      // display details
      this.displayDetails = true;
      // trigger rerender
      this.changeDetector.detectChanges();
    });
  }

  displayWelcomeModal() {
    // display welcome modal
    setTimeout(() => {
      this.modalService.commandModal.next({
        modal: Modals.WELCOME,
        action: ModalAction.DISPLAY
      });
    }, 1000);
  }

  initMap() {
    // center on France
    this.center = new google.maps.LatLng(47.0146777, 4.0369432);

    // set map options
    this.mapOptions = {
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      }
    };
  }

}
