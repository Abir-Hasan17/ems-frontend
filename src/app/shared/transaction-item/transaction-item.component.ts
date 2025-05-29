import { Component, Input } from '@angular/core';
import { trxType } from '../../models/enumerators';
import { CommonModule } from '@angular/common';
import { trx } from '../../models/interfaces';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-item',
  imports: [CommonModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.css',
})
export class TransactionItemComponent {
  @Input() trx!: transaction;
  trxType = trxType;
}
