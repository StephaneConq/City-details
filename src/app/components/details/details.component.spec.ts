import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {HttpClientModule} from "@angular/common/http";
import {MapsService} from "../../services/maps.service";
import {BehaviorSubject} from "rxjs";
import {CityService} from "../../services/city.service";

class FakeMapService {
  newViewport = new BehaviorSubject(null);
}

let fakeMapService: FakeMapService;
let fakeCityService: CityService;

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  fakeMapService = new FakeMapService();
  fakeCityService = new CityService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [HttpClientModule],
      providers: [
        {provide: MapsService, useValue: fakeMapService},
        {provide: CityService, useValue: fakeCityService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close details', () => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.close();
    expect(fakeMapService.newViewport.getValue()).toBeUndefined();
    expect(fakeCityService.selectedCityName.getValue()).toEqual(null);
  });

});
