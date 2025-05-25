import { Component } from '@angular/core';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { trxType } from '../../models/enumerators';
import { trx } from '../../models/interfaces';
import { trxDummy } from '../../models/dummy-data';

@Component({
  selector: 'app-balance-report',
  imports: [TransactionItemComponent],
  templateUrl: './balance-report.component.html',
  styleUrl: './balance-report.component.css',
})
export class BalanceReportComponent {
  currentBalance = 2450;
  totalIncome = 5000;
  totalExpense = 2550;
  trxType = trxType;

  recentTrx: trx[] = trxDummy.slice(0, 3);
}
