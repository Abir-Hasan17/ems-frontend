import { inject, Injectable } from '@angular/core';
import { login_Request, login_Response } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  url = `${environment.apiUrl}/auth/login`;
  login(loginRequest: login_Request) {
    return this.http.post<login_Response>(this.url, loginRequest, {
      withCredentials: true,
    });
  }

  // signUp(signUpRequest: )
  constructor() {}
}
