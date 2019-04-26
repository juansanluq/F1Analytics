import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitsIndexComponent } from './circuits-index.component';

describe('CircuitsIndexComponent', () => {
  let component: CircuitsIndexComponent;
  let fixture: ComponentFixture<CircuitsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
