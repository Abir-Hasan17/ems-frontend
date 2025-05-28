import { Component, inject } from '@angular/core';
import { SidebarNavElimentComponent } from '../sidebar-nav-eliment/sidebar-nav-eliment.component';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { RedirectCommand, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarNavElimentComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  logout() {
    this.authService
      .logout()
      .pipe(
        catchError((err) => {
          console.error('Logout failed:', err);
          throw Error;
        })
      )
      .subscribe((res: any) => {
        console.log('Logout successful:', res);
        this.router.navigate(['/login']);
      });
  }
  navItems = [
    { navLabel: 'Home', navRoute: '', navIcon: 'house.svg' },
    {
      navLabel: 'Incomes',
      navRoute: 'incomes',
      navIcon: 'banknote-arrow-up.svg',
    },
    {
      navLabel: 'Expenses',
      navRoute: 'expenses',
      navIcon: 'banknote-arrow-down.svg',
    },
  ];
}
