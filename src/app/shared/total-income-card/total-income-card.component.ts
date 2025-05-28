import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';

@Component({
  selector: 'app-total-income-card',
  imports: [],
  templateUrl: './total-income-card.component.html',
  styleUrl: './total-income-card.component.css',
})
export class TotalIncomeCardComponent {
  @Input() incomes!: trx[];

  getTotalIncome(): any {
    return this.incomes.reduce((sum, income) => sum + income.amount, 0);
  }
}
