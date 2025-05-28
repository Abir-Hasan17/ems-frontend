import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { trxType } from '../../models/enumerators';
import { EditButtonComponent } from '../edit-button/edit-button.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { ModalComponent } from '../modal/modal.component';
import { AddUpdateTransactionComponent } from '../add-update-transaction/add-update-transaction.component';
import { trx } from '../../models/interfaces';

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
  @Input() transaction: any;
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

  onSave(returnedTrx: trx) {
    console.log('updated');
    console.log(returnedTrx);
    this.onEdit();
  }
  onEdit() {
    throw new Error('Method not implemented.');
  }
  onDelete() {
    throw new Error('Method not implemented.');
  }
}
