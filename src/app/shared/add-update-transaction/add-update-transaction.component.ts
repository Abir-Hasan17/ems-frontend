import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
} from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-update-transaction',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-update-transaction.component.html',
  styleUrl: './add-update-transaction.component.css',
})
export class AddUpdateTransactionComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<create_transaction_request>();

  @Input() title!: string;
  @Input() icon!: string;
  trxType = trxType;
  @Input() trx: create_transaction_request = {
    userId: '',
    label: '',
    amount: 0,
    transactionDate: new Date(),
    modificationDate: new Date(),
    type: trxType.income,
    note: '',
  };
  form: FormGroup;
  authService = inject(AuthService);
  userId!: string;

  constructor() {
    // Initialize empty form in constructor
    this.form = new FormGroup({
      label: new FormControl('', [Validators.required]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)?$/),
      ]),
      type: new FormControl(trxType.income, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      note: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trx'] && changes['trx'].currentValue) {
      this.updateForm(this.trx);
    }
  }

  private updateForm(trx: create_transaction_request) {
    this.form.patchValue({
      label: trx.label,
      amount: trx.amount.toString(),
      type: trx.type,
      date: trx.transactionDate ? new Date(trx.transactionDate) : new Date(),
      note: trx.note,
    });
  }

  onSubmit() {
    console.log(this.trx);
    const formValue = this.form.value;
    if (this.form.valid && this.userId) {
      const updatedTrx: create_transaction_request = {
        userId: this.userId, // assuming userId is available from authService
        label: formValue.label!,
        amount: parseFloat(formValue.amount!), // convert from string if necessary
        type: formValue.type!,
        note: formValue.note || '', // fallback to empty string if null
        transactionDate: formValue.date!,
        modificationDate: new Date(),
      };

      this.save.emit(updatedTrx); // Emit to parent instead of modifying locally
      this.close.emit();
    }
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
