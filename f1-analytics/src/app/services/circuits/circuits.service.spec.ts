import { TestBed } from '@angular/core/testing';

import { CircuitsService } from './circuits.service';

describe('CircuitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CircuitsService = TestBed.get(CircuitsService);
    expect(service).toBeTruthy();
  });
});
