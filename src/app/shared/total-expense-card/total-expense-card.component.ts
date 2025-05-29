import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-total-expense-card',
  imports: [],
  templateUrl: './total-expense-card.component.html',
  styleUrl: './total-expense-card.component.css',
})
export class TotalExpenseCardComponent {
  @Input() totalExpense!: number;
}
