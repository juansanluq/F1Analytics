import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsIndexComponent } from './seasons-index.component';

describe('SeasonsIndexComponent', () => {
  let component: SeasonsIndexComponent;
  let fixture: ComponentFixture<SeasonsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
