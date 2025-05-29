import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { trxType } from '../../models/enumerators';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { trx } from '../../models/interfaces';
import {
  create_transaction_request,
  transaction,
  TransactionService,
} from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-transaction',
  imports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})
export class AddTransactionComponent {
  @Output() close = new EventEmitter<void>();
  trxType = trxType;
  trx!: create_transaction_request;
  userId!: string;
  authService = inject(AuthService);
  transactionService = inject(TransactionService);

  form = new FormGroup({
    label: new FormControl('', [Validators.required]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
    type: new FormControl(trxType.income, Validators.required),
    date: new FormControl(new Date(), Validators.required),
    note: new FormControl(),
  });

  onSubmit() {
    const formValue = this.form.value;
    if (this.form.valid && this.userId) {
      this.trx = {
        userId: this.userId, // assuming userId is available from authService
        label: formValue.label!,
        amount: parseFloat(formValue.amount!), // convert from string if necessary
        type: formValue.type!,
        note: formValue.note || '', // fallback to empty string if null
        transactionDate: formValue.date!,
        modificationDate: new Date(),
      };
      console.log(this.trx);
      this.addTransaction(this.trx);
      this.close.emit();
    }
  }
  addTransaction(data: create_transaction_request) {
    this.transactionService.createTransaction(data).subscribe({
      next: (res) => console.log('Transaction created:', res),
      error: (err) => console.error('Creation failed:', err),
    });
  }

  ngOnInit() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId) {
        this.userId = userId;
        console.log('User ID:', userId);
      } else {
        // Not authenticated
        console.error('User is not authenticated');
      }
    });
  }
}
