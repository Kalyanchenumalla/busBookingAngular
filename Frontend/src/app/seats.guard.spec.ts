import { TestBed } from '@angular/core/testing';

import { SeatsGuard } from './seats.guard';

describe('SeatsGuard', () => {
  let guard: SeatsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeatsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
