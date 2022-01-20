import { TestBed } from '@angular/core/testing';

import { SupplierAuthGuard } from './supplier-auth.guard';

describe('SupplierAuthGuard', () => {
  let guard: SupplierAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SupplierAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
