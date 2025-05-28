import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './dashboard/landing/landing.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RootComponent } from './dashboard/root/root.component';
import { IncomesComponent } from './transactions/incomes/incomes.component';
import { ExpensesComponent } from './transactions/expenses/expenses.component';
import { AuthCheckCookiesGuard } from './guards/auth-check-cookies.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'home',
    component: RootComponent,
    canActivate: [AuthCheckCookiesGuard],

    children: [
      { path: '', component: HomeComponent },
      { path: 'incomes', component: IncomesComponent },
      { path: 'expenses', component: ExpensesComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
