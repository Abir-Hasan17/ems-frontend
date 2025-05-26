import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BalanceReportComponent } from '../../shared/balance-report/balance-report.component';
import { BalanceLineChartComponent } from '../balance-line-chart/balance-line-chart.component';
import { trxDummy } from '../../models/dummy-data';

@Component({
  selector: 'app-home',
  imports: [
    SidebarComponent,
    BalanceReportComponent,
    BalanceLineChartComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  trxList = trxDummy;
}
