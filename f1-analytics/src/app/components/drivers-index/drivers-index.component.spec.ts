import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversIndexComponent } from './drivers-index.component';

describe('DriversIndexComponent', () => {
  let component: DriversIndexComponent;
  let fixture: ComponentFixture<DriversIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
