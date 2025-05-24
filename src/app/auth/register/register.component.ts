import { Component } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { loginButtonState } from '../../models/enumerators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [InputComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})
export class RegisterComponent {
  buttonState = loginButtonState.active;
  loginButtonState = loginButtonState;

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  form = new FormGroup({
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
}
