import { TestBed } from '@angular/core/testing';

import { AffectationLigneBusService } from './affectation-ligne-bus.service';

describe('AffectationLigneBusService', () => {
  let service: AffectationLigneBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationLigneBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
