import { TestBed } from '@angular/core/testing';

import { ShowItemOnTheCartService } from './show-item-on-the-cart.service';

describe('ShowItemOnTheCartService', () => {
  let service: ShowItemOnTheCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowItemOnTheCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
