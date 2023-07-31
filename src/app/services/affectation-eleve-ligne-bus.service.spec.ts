import { TestBed } from '@angular/core/testing';

import { AffectationEleveLigneBusService } from './affectation-eleve-ligne-bus.service';

describe('AffectationEleveLigneBusService', () => {
  let service: AffectationEleveLigneBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationEleveLigneBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
