import { Component, inject } from '@angular/core';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { trxType } from '../../models/enumerators';
import { Gradient, trx } from '../../models/interfaces';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { AuthService } from '../../services/auth.service';
import {
  transaction,
  TransactionService,
} from '../../services/transaction.service';
import { HighestExpenseCardComponent } from '../../shared/highest-expense-card/highest-expense-card.component';
import { TotalExpenseCardComponent } from '../../shared/total-expense-card/total-expense-card.component';

@Component({
  selector: 'app-expenses',
  imports: [
    TopBarComponent,
    LineChartComponent,
    TransactionCardComponent,
    HighestExpenseCardComponent,
    TotalExpenseCardComponent,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {
  authService = inject(AuthService);
  trxService = inject(TransactionService);

  userId?: string;
  expenses: transaction[] = [];
  totalExpense: number = 0;
  highestExpense: number = 0;

  expenseFillGradient: Gradient = {
    top: 'rgba(197, 4, 82, 0.5)',
    bottom: 'rgba(197, 4, 82, 0.1)',
  };
  expenseLineGradient: Gradient = {
    top: 'rgba(139, 0, 56, 0.8)',
    bottom: 'rgba(139, 0, 56, 0.5)',
  };

  ngOnInit() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId) {
        this.userId = userId;
        this.fetchExpenses(userId);
      } else {
        console.error('User is not authenticated');
      }
    });
  }

  fetchExpenses(userId: string) {
    this.trxService.getTransactionsByUserId(userId).subscribe({
      next: (allTrx) => {
        this.expenses = allTrx
          .filter((trx) => trx.type === trxType.expense)
          .sort(
            (a, b) =>
              new Date(a.transactionDate).getTime() -
              new Date(b.transactionDate).getTime()
          )
          .reverse();
        this.totalExpense = this.expenses.reduce(
          (sum, trx) => sum + trx.amount,
          0
        );
        this.highestExpense = Math.max(
          ...this.expenses.map((trx) => trx.amount),
          0
        );
      },
      error: (err) => {
        console.error('Failed to fetch expenses', err);
      },
    });
  }

  getExpenses(): transaction[] {
    return this.expenses;
  }
}
