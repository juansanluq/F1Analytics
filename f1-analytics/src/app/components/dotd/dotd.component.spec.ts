import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotdComponent } from './dotd.component';

describe('DotdComponent', () => {
  let component: DotdComponent;
  let fixture: ComponentFixture<DotdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
