import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { login_request, login_response } from '../../models/auth';
import { loginButtonState } from '../../models/enumerators';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loginResponse: login_response | undefined;
  buttonState = loginButtonState.active;
  loginButtonState = loginButtonState;

  onSubmit() {
    this.login();
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login() {
    this.buttonState = loginButtonState.loading;
    const res = this.authService.login;
    console.log(res);

    const loginRequest: login_request = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };
    console.log(loginRequest);
    this.authService
      .login(loginRequest)
      .pipe(
        catchError((err) => {
          this.buttonState = loginButtonState.active;
          console.log(this.buttonState);
          console.log(err);
          alert('Login failed!');
          throw err;
        })
      )
      .subscribe((response) => {
        console.log('Server Response: ');
        console.log(response);
        this.loginResponse = response;
        this.buttonState = loginButtonState.active;
        this.router.navigate(['/home']);
      });

    console.log(this.loginResponse);
  }
}
