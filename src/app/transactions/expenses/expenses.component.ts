import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';
import { Gradient } from '../../models/interfaces';
import { trxDummy } from '../../models/dummy-data';
import { trxType } from '../../models/enumerators';

@Component({
  selector: 'app-expenses',
  imports: [TopBarComponent, LineChartComponent, TransactionCardComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {
  expenseFillGradient: Gradient = {
    top: 'rgba(197, 4, 82, 0.5)',
    bottom: 'rgba(197, 4, 82, 0.1)',
  };
  expenseLineGradient: Gradient = {
    top: 'rgba(139, 0, 56, 0.8)',
    bottom: 'rgba(139, 0, 56, 0.5)',
  };

  getHighestExpense() {
    return this.getExpenses().reduce((sum, expense) => sum + expense.amount, 0);
  }
  getExpenses() {
    return trxDummy.filter((trx) => trx.type == trxType.expense);
  }
  getTotalExpenses() {
    const expenses = this.getExpenses();
    return expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;
  }
}
