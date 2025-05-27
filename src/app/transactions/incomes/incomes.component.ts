import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { trxDummy } from '../../models/dummy-data';
import { trxType } from '../../models/enumerators';
import { Gradient, trx } from '../../models/interfaces';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@Component({
  selector: 'app-incomes',
  imports: [TopBarComponent, TransactionCardComponent, LineChartComponent],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css',
})
export class IncomesComponent {
  incomeFillGradient: Gradient = {
    top: 'rgba(0, 227, 168, 0.8)',
    bottom: 'rgba(5, 226, 169, 0.1)',
  };
  incomeLineGradient: Gradient = {
    top: 'rgba(0, 139, 103, 0.8)',
    bottom: 'rgba(0, 139, 103, 0.5)',
  };

  getTotalIncome(): any {
    return this.getIncomes().reduce((sum, income) => sum + income.amount, 0);
  }
  getHighestIncome(): any {
    const incomes = this.getIncomes();
    return incomes.length > 0
      ? Math.max(...incomes.map((income) => income.amount))
      : 0;
  }
  trx = trxDummy[0];
  getIncomes() {
    return trxDummy.filter((trx) => trx.type == trxType.income);
  }
}
