import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorsIndexComponent } from './constructors-index.component';

describe('ConstructorsIndexComponent', () => {
  let component: ConstructorsIndexComponent;
  let fixture: ComponentFixture<ConstructorsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
