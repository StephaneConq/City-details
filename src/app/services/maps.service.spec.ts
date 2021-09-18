import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';
import {HttpClientModule} from "@angular/common/http";

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
