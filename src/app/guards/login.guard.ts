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
export class LoginGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('LoginGuard activated');
    return this.authService.checkAuthStatus().pipe(
      map((res) => {
        console.log('Auth status:', res);
        if (res.isAuthenticated) {
          return this.router.createUrlTree(['/home']);
        } else {
          return false; // Redirect to login
        }
      }),
      catchError(() => of(true))
    );
  }
}
