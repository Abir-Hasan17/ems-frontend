import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthCheckCookiesGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.checkAuthStatus().pipe(
      map((res) => {
        console.log('Auth status:', res);
        if (res.isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']); // Redirect to login
        }
      }),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
