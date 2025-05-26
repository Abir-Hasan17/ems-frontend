import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BalanceReportComponent } from '../../shared/balance-report/balance-report.component';
import { trxDummy } from '../../models/dummy-data';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { trxType } from '../../models/enumerators';
import { Gradient } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, BalanceReportComponent, LineChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  trxList = trxDummy;
  trxFillGradient: Gradient = {
    top: 'rgba(0, 128, 128, 0.3)',
    bottom: 'rgba(255, 0, 128, 0.1)',
  };
  trxLineGradient: Gradient = {
    top: 'teal',
    bottom: 'deeppink',
  };

  incomeList = trxDummy.filter((trx) => trx.type == trxType.income);
  incomeFillGradient: Gradient = {
    top: 'rgba(0, 227, 168, 0.8)',
    bottom: 'rgba(5, 226, 169, 0.1)',
  };
  incomeLineGradient: Gradient = {
    top: 'rgba(0, 139, 103, 0.8)',
    bottom: 'rgba(0, 139, 103, 0.5)',
  };

  expenseList = trxDummy.filter((trx) => trx.type == trxType.expense);
  expenseFillGradient: Gradient = {
    top: 'rgba(197, 4, 82, 0.5)',
    bottom: 'rgba(197, 4, 82, 0.1)',
  };
  expenseLineGradient: Gradient = {
    top: 'rgba(139, 0, 56, 0.8)',
    bottom: 'rgba(139, 0, 56, 0.5)',
  };
}
