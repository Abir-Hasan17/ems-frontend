import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { trxType } from '../../models/enumerators';
import { EditButtonComponent } from '../edit-button/edit-button.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { ModalComponent } from '../modal/modal.component';
import { AddUpdateTransactionComponent } from '../add-update-transaction/add-update-transaction.component';
import { trx } from '../../models/interfaces';
import {
  create_transaction_request,
  transaction,
  TransactionService,
} from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-card',
  imports: [
    CommonModule,
    EditButtonComponent,
    DeleteButtonComponent,
    ModalComponent,
    AddUpdateTransactionComponent,
  ],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css',
})
export class TransactionCardComponent {
  @Input() transaction!: transaction;
  get isIncome() {
    return this.transaction.type === trxType.income; // Adjust if trxType is an enum
  }
  showUpdateModal = false;
  openModal() {
    this.showUpdateModal = true;
    console.log('opening modal');
  }
  closeModal() {
    this.showUpdateModal = false;
  }

  onSave(returnedTrx: create_transaction_request) {
    console.log('updated');
    console.log(returnedTrx);
    this.onEdit(returnedTrx);
  }
  onEdit(returnedTrx: create_transaction_request) {
    this.transactionService
      .updateTransaction(this.transaction._id, returnedTrx)
      .subscribe({
        next: (res) => console.log('Transaction updated:', res),
        error: (err) => console.error('Update failed:', err),
      });
  }
  onDelete() {
    this.delete(this.transaction._id);
  }
  transactionService = inject(TransactionService);

  delete(id: string) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: (res) => console.log('Transaction deleted:', res.message),
      error: (err) => console.error('Delete failed:', err),
    });
  }
}
