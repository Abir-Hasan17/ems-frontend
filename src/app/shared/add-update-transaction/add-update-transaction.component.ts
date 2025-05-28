import {
  Component,
  EventEmitter,
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
  @Output() save = new EventEmitter<trx>();

  @Input() title!: string;
  @Input() icon!: string;
  trxType = trxType;
  @Input() trx: trx = {
    label: '',
    amount: 0,
    realDate: new Date(),
    date: '',
    type: trxType.income,
    note: '',
  };
  form: FormGroup;

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

  private updateForm(trx: trx) {
    this.form.patchValue({
      label: trx.label,
      amount: trx.amount.toString(),
      type: trx.type,
      date: trx.date ? new Date(trx.date) : new Date(),
      note: trx.note,
    });
  }

  onSubmit() {
    console.log(this.trx);
    const formValue = this.form.value;
    if (this.form.valid) {
      const updatedTrx: trx = {
        label: formValue.label!,
        amount: parseFloat(formValue.amount!),
        realDate: new Date(),
        date: formValue.date!.toISOString().split('T')[0],
        type: formValue.type!,
        note: formValue.note || '',
      };

      this.save.emit(updatedTrx); // Emit to parent instead of modifying locally
      this.close.emit();
    }
  }
}
