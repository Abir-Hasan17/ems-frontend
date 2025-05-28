import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';
import { Gradient } from '../../models/interfaces';
import { trxDummy } from '../../models/dummy-data';
import { trxType } from '../../models/enumerators';
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
  expenseFillGradient: Gradient = {
    top: 'rgba(197, 4, 82, 0.5)',
    bottom: 'rgba(197, 4, 82, 0.1)',
  };
  expenseLineGradient: Gradient = {
    top: 'rgba(139, 0, 56, 0.8)',
    bottom: 'rgba(139, 0, 56, 0.5)',
  };

  getExpenses() {
    return trxDummy.filter((trx) => trx.type == trxType.expense);
  }
}
