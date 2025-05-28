import { Component, Input, input } from '@angular/core';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { trxType } from '../../models/enumerators';
import { trx } from '../../models/interfaces';
import { trxDummy } from '../../models/dummy-data';
import { TotalIncomeCardComponent } from '../total-income-card/total-income-card.component';
import { TotalExpenseCardComponent } from '../total-expense-card/total-expense-card.component';
import { HighestExpenseCardComponent } from '../highest-expense-card/highest-expense-card.component';
import { HighestIncomeCardComponent } from '../highest-income-card/highest-income-card.component';

@Component({
  selector: 'app-balance-report',
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
  totalIncome = 5000;
  totalExpense = 2550;
  trxType = trxType;

  recentTrx: trx[] = trxDummy.slice(0, 3);
  incomes = trxDummy.filter((trx) => trx.type == trxType.income);
  expenses = trxDummy.filter((trx) => trx.type == trxType.expense);
  currentBalance = this.getBalance();

  getBalance(): number {
    const totalIncome = this.incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const totalExpenses = this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return totalIncome - totalExpenses;
  }
}
