import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';

@Component({
  selector: 'app-highest-income-card',
  imports: [],
  templateUrl: './highest-income-card.component.html',
  styleUrl: './highest-income-card.component.css',
})
export class HighestIncomeCardComponent {
  @Input() incomes!: trx[];

  getHighestIncome(): any {
    const incomes = this.incomes;
    return incomes.length > 0
      ? Math.max(...incomes.map((income) => income.amount))
      : 0;
  }
}
