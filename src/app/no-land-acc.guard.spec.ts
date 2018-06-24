import { TestBed, inject } from '@angular/core/testing';

import { LandAtGuard } from './no-land-acc.guard';

describe('NoLandAccGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandAtGuard]
    });
  });

  it('should ...', inject([LandAtGuard], (guard: LandAtGuard) => {
    expect(guard).toBeTruthy();
  }));
});
