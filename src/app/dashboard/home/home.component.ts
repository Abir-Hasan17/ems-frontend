import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BalanceReportComponent } from '../../shared/balance-report/balance-report.component';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, BalanceReportComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
