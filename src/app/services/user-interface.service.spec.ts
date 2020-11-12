import { TestBed } from '@angular/core/testing';

import { UserInterfaceService } from './user-interface.service';

describe('UserInterfaceService', () => {
  let service: UserInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
