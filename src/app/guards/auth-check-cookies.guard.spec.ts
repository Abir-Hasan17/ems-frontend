import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authCheckCookiesGuard } from './auth-check-cookies.guard';

describe('authCheckCookiesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authCheckCookiesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
