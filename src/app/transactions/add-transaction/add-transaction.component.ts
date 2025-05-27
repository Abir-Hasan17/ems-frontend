import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
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
  trx!: trx;
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
    if (this.form.valid) {
      this.trx = {
        label: formValue.label!,
        amount: parseFloat(formValue.amount!), // convert from string if necessary
        realDate: new Date(),
        date: formValue.date!.toISOString().split('T')[0], // YYYY-MM-DD
        type: formValue.type!,
        note: formValue.note || '', // fallback to empty string if null
      };
      console.log(this.trx);
      this.close.emit();
    }
  }
}
