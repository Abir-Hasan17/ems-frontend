import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-highest-expense-card',
  imports: [],
  templateUrl: './highest-expense-card.component.html',
  styleUrl: './highest-expense-card.component.css',
})
export class HighestExpenseCardComponent {
  @Input() highestExpense!: number;
}
