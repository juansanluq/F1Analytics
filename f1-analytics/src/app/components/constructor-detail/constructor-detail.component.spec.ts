import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorDetailComponent } from './constructor-detail.component';

describe('ConstructorDetailComponent', () => {
  let component: ConstructorDetailComponent;
  let fixture: ComponentFixture<ConstructorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
