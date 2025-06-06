import { Component, inject } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { loginButtonState } from '../../models/enumerators';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  login_request,
  login_response,
  register_request,
  register_response,
} from '../../models/auth';
import { catchError } from 'rxjs/internal/operators/catchError';

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
    this.register();
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

  authService = inject(AuthService);
  router = inject(Router);
  registerResponse: register_response | undefined;

  register() {
    this.buttonState = loginButtonState.loading;

    const register_request: register_request = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      firstName: this.form.value.f_name ?? '',
      lastName: this.form.value.l_name ?? '',
    };
    console.log(register_request);
    this.authService
      .register(register_request)
      .pipe(
        catchError((err) => {
          this.buttonState = loginButtonState.active;
          console.log(this.buttonState);
          console.log(err);
          alert('Registration failed!');
          throw err;
        })
      )
      .subscribe((response) => {
        console.log('Server Response: ');
        console.log(response);
        this.registerResponse = response;
        this.buttonState = loginButtonState.active;
        this.router.navigate(['/home']);
      });

    console.log(this.registerResponse);
  }
}
