import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BalanceReportComponent } from '../../shared/balance-report/balance-report.component';
import { trxDummy } from '../../models/dummy-data';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { trxType } from '../../models/enumerators';
import { Gradient } from '../../models/interfaces';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { AuthService } from '../../services/auth.service';
import {
  transaction,
  TransactionService,
} from '../../services/transaction.service';

@Component({
  selector: 'app-home',
  imports: [BalanceReportComponent, LineChartComponent, TopBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authServices = inject(AuthService);
  trxService = inject(TransactionService);
  userId?: string;

  trxList: transaction[] = [];
  incomeList: transaction[] = [];
  expenseList: transaction[] = [];

  trxFillGradient: Gradient = {
    top: 'rgba(0, 128, 128, 0.3)',
    bottom: 'rgba(255, 0, 128, 0.1)',
  };
  trxLineGradient: Gradient = {
    top: 'teal',
    bottom: 'deeppink',
  };

  incomeFillGradient: Gradient = {
    top: 'rgba(0, 227, 168, 0.8)',
    bottom: 'rgba(5, 226, 169, 0.1)',
  };
  incomeLineGradient: Gradient = {
    top: 'rgba(0, 139, 103, 0.8)',
    bottom: 'rgba(0, 139, 103, 0.5)',
  };

  expenseFillGradient: Gradient = {
    top: 'rgba(197, 4, 82, 0.5)',
    bottom: 'rgba(197, 4, 82, 0.1)',
  };
  expenseLineGradient: Gradient = {
    top: 'rgba(139, 0, 56, 0.8)',
    bottom: 'rgba(139, 0, 56, 0.5)',
  };

  ngOnInit() {
    this.authServices.getUserId().subscribe((userId) => {
      if (userId) {
        this.userId = userId;
        this.fetchTransactions(userId);
        console.log('User ID:', userId);
      } else {
        // Not authenticated
        console.error('User is not authenticated');
      }
    });
  }

  fetchTransactions(userId: string) {
    this.trxService.getTransactionsByUserId(userId).subscribe({
      next: (data) => {
        this.trxList = data;
        this.incomeList = data.filter((trx) => trx.type === trxType.income);
        this.expenseList = data.filter((trx) => trx.type === trxType.expense);
        console.log('Transactions loaded:', this.trxList);
      },
      error: (err) => {
        console.error('Failed to load transactions:', err);
      },
    });
  }
}
