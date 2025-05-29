import { Component, inject } from '@angular/core';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { trxType } from '../../models/enumerators';
import { Gradient, trx } from '../../models/interfaces';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { HighestIncomeCardComponent } from '../../shared/highest-income-card/highest-income-card.component';
import { TotalIncomeCardComponent } from '../../shared/total-income-card/total-income-card.component';
import { AuthService } from '../../services/auth.service';
import {
  getTotal,
  transaction,
  TransactionService,
} from '../../services/transaction.service';

@Component({
  selector: 'app-incomes',
  imports: [
    TopBarComponent,
    TransactionCardComponent,
    LineChartComponent,
    HighestIncomeCardComponent,
    TotalIncomeCardComponent,
  ],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css',
})
export class IncomesComponent {
  authService = inject(AuthService);
  trxService = inject(TransactionService);

  userId?: string;
  incomes: transaction[] = [];
  totalIncome: number = 0;
  highestIncome: number = 0;

  incomeFillGradient: Gradient = {
    top: 'rgba(0, 227, 168, 0.8)',
    bottom: 'rgba(5, 226, 169, 0.1)',
  };
  incomeLineGradient: Gradient = {
    top: 'rgba(0, 139, 103, 0.8)',
    bottom: 'rgba(0, 139, 103, 0.5)',
  };

  ngOnInit() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId) {
        this.userId = userId;
        this.fetchIncomes(userId);
      } else {
        console.error('User is not authenticated');
      }
    });
  }

  fetchIncomes(userId: string) {
    this.trxService.getTransactionsByUserId(userId).subscribe({
      next: (allTrx) => {
        this.incomes = allTrx.filter((t) => t.type === trxType.income);
        this.totalIncome = getTotal(this.incomes);
        this.highestIncome = Math.max(...this.incomes.map((t) => t.amount), 0);
        console.log('Fetched incomes:', this.incomes);
        // Optional: pick first transaction for display
      },
      error: (err) => {
        console.error('Failed to fetch income transactions', err);
      },
    });
  }

  getIncomes(): transaction[] {
    return this.incomes;
  }
}
