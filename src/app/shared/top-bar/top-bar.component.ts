import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { InputComponent } from '../input/input.component';
import { AddTransactionComponent } from '../../transactions/add-transaction/add-transaction.component';
import { AddUpdateTransactionComponent } from '../add-update-transaction/add-update-transaction.component';
import { trx } from '../../models/interfaces';
import {
  create_transaction_request,
  TransactionService,
} from '../../services/transaction.service';

@Component({
  selector: 'app-top-bar',
  imports: [
    ModalComponent,
    InputComponent,
    AddTransactionComponent,
    AddUpdateTransactionComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Input() pageTitle = '';
  @Input() pageIcon = '';
  @Input() pageQuote = '';
  transactionService = inject(TransactionService);

  showAddModal = false;

  openModal() {
    this.showAddModal = true;
    console.log('opening modal');
  }

  closeModal() {
    this.showAddModal = false;
  }
  onSave(returnedTrx: create_transaction_request) {
    console.log(returnedTrx);
    this.transactionService.createTransaction(returnedTrx).subscribe({
      next: (res) => console.log('Transaction created:', res),
      error: (err) => console.error('Creation failed:', err),
    });
  }
}
