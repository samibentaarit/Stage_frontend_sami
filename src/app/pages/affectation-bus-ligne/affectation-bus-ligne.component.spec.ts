import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationBusLigneComponent } from './affectation-bus-ligne.component';

describe('AffectationsComponent', () => {
  let component: AffectationBusLigneComponent;
  let fixture: ComponentFixture<AffectationBusLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationBusLigneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationBusLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
