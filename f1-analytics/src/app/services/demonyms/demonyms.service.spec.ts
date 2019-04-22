import { TestBed } from '@angular/core/testing';

import { DemonymsService } from './demonyms.service';

describe('DemonymsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemonymsService = TestBed.get(DemonymsService);
    expect(service).toBeTruthy();
  });
});
