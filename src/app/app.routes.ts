import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './dashboard/landing/landing.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RootComponent } from './dashboard/root/root.component';
import { IncomesComponent } from './transactions/incomes/incomes.component';
import { ExpensesComponent } from './transactions/expenses/expenses.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: RootComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'incomes', component: IncomesComponent },
      { path: 'expenses', component: ExpensesComponent },
    ],
  },
];
