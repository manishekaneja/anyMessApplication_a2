import { TestBed, async, inject } from '@angular/core/testing';

import { LandAtDashboardGuard } from './no-land-acc.guard';

describe('NoLandAccGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandAtDashboardGuard]
    });
  });

  it('should ...', inject([LandAtDashboardGuard], (guard: LandAtDashboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
