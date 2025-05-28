import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';

@Component({
  selector: 'app-highest-expense-card',
  imports: [],
  templateUrl: './highest-expense-card.component.html',
  styleUrl: './highest-expense-card.component.css',
})
export class HighestExpenseCardComponent {
  @Input() expenses!: trx[];

  getHighestExpense() {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
}
