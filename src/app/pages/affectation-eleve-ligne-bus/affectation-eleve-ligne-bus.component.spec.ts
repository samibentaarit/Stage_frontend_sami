import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationEleveLigneBusComponent } from './affectation-eleve-ligne-bus.component';

describe('AffectationEleveLigneBusComponent', () => {
  let component: AffectationEleveLigneBusComponent;
  let fixture: ComponentFixture<AffectationEleveLigneBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationEleveLigneBusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationEleveLigneBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
