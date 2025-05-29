import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-total-income-card',
  imports: [],
  templateUrl: './total-income-card.component.html',
  styleUrl: './total-income-card.component.css',
})
export class TotalIncomeCardComponent {
  @Input() totalIncome!: number;
}
