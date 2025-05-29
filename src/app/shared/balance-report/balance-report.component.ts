import { Component, inject } from '@angular/core';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { trxType } from '../../models/enumerators';
import { TotalIncomeCardComponent } from '../total-income-card/total-income-card.component';
import { TotalExpenseCardComponent } from '../total-expense-card/total-expense-card.component';
import { HighestExpenseCardComponent } from '../highest-expense-card/highest-expense-card.component';
import { HighestIncomeCardComponent } from '../highest-income-card/highest-income-card.component';
import { AuthService } from '../../services/auth.service';
import {
  transaction,
  TransactionService,
} from '../../services/transaction.service';

@Component({
  selector: 'app-balance-report',
  standalone: true,
  imports: [
    TransactionItemComponent,
    TotalIncomeCardComponent,
    TotalExpenseCardComponent,
    HighestExpenseCardComponent,
    HighestIncomeCardComponent,
  ],
  templateUrl: './balance-report.component.html',
  styleUrl: './balance-report.component.css',
})
export class BalanceReportComponent {
  authService = inject(AuthService);
  trxService = inject(TransactionService);

  trxType = trxType;
  transactions: transaction[] = [];
  incomes: transaction[] = [];
  expenses: transaction[] = [];
  recentTrx: transaction[] = [];
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;
  highestIncome: number = 0;
  highestExpense: number = 0;
  currentBalance = 0;

  ngOnInit() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId) {
        this.trxService.getTransactionsByUserId(userId).subscribe({
          next: (trxList) => {
            this.transactions = trxList;
            this.incomes = trxList.filter((t) => t.type === trxType.income);
            this.expenses = trxList.filter((t) => t.type === trxType.expense);
            this.recentTrx = trxList.slice(0, 3);
            this.calculateStats();
          },
          error: (err) => console.error('Failed to load transactions', err),
        });
      } else {
        console.error('User is not authenticated');
      }
    });
  }

  calculateStats() {
    this.totalIncome = this.incomes.reduce((sum, t) => sum + t.amount, 0);
    this.totalExpense = this.expenses.reduce((sum, t) => sum + t.amount, 0);
    this.currentBalance = this.totalIncome - this.totalExpense;
    this.highestIncome = Math.max(...this.incomes.map((t) => t.amount), 0);
    this.highestExpense = Math.max(...this.expenses.map((t) => t.amount), 0);
  }
}
