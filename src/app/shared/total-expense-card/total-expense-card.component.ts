import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';

@Component({
  selector: 'app-total-expense-card',
  imports: [],
  templateUrl: './total-expense-card.component.html',
  styleUrl: './total-expense-card.component.css',
})
export class TotalExpenseCardComponent {
  @Input() expenses!: trx[];

  getTotalExpenses(): any {
    return this.expenses.reduce((sum, income) => sum + income.amount, 0);
  }
}
