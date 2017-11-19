import { TestBed, inject } from '@angular/core/testing';

import { AjaxCallService } from './ajax-call.service';

describe('AjaxCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxCallService]
    });
  });

  it('should be created', inject([AjaxCallService], (service: AjaxCallService) => {
    expect(service).toBeTruthy();
  }));
});
