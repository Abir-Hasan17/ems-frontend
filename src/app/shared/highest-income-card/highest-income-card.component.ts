import { Component, Input } from '@angular/core';
import { trx } from '../../models/interfaces';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-highest-income-card',
  imports: [],
  templateUrl: './highest-income-card.component.html',
  styleUrl: './highest-income-card.component.css',
})
export class HighestIncomeCardComponent {
  @Input() highestIncome!: number;
}
