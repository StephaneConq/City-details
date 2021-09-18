import { TestBed } from '@angular/core/testing';

import { GeoapiService } from './geoapi.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";

class FakeHttpClient {

  constructor() {
  }

  get(url: string) {
    return of([]);
  }
}

let fakeHttp: FakeHttpClient;

describe('GeoapiService', () => {
  let service: GeoapiService;

  beforeEach(() => {

    fakeHttp = new FakeHttpClient();

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{provide: HttpClient, useValue: fakeHttp}]
    });
    service = TestBed.inject(GeoapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api', () => {
    service.getDataFromCoordinates('testCity').subscribe(res => {
      expect(res).toEqual([]);
    });
  })
});
