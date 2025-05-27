import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { trxType } from '../../models/enumerators';

@Component({
  selector: 'app-transaction-card',
  imports: [CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css',
})
export class TransactionCardComponent {
  @Input() transaction: any;
  get isIncome() {
    return this.transaction.type === trxType.income; // Adjust if trxType is an enum
  }
}
