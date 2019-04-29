import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitDetailComponent } from './circuit-detail.component';

describe('CircuitDetailComponent', () => {
  let component: CircuitDetailComponent;
  let fixture: ComponentFixture<CircuitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
