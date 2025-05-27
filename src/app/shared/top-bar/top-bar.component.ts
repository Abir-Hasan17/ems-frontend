import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { InputComponent } from '../input/input.component';
import { AddTransactionComponent } from '../../transactions/add-transaction/add-transaction.component';

@Component({
  selector: 'app-top-bar',
  imports: [ModalComponent, InputComponent, AddTransactionComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Input() pageTitle = '';
  @Input() pageIcon = '';
  @Input() pageQuote = '';

  showAddModal = false;

  openModal() {
    this.showAddModal = true;
    console.log('opening modal');
  }

  closeModal() {
    this.showAddModal = false;
  }
}
