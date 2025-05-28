import { inject, Injectable } from '@angular/core';
import {
  login_request,
  login_response,
  register_request,
  register_response,
} from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(loginRequest: login_request) {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<login_response>(url, loginRequest, {
      withCredentials: true,
    });
  }

  register(register_request: register_request) {
    const url = `${environment.apiUrl}/auth/register`;
    return this.http.post<register_response>(url, register_request, {
      withCredentials: true,
    });
  }

  checkAuthStatus() {
    const url = `${environment.apiUrl}/auth/status`;
    return this.http.get<{ isAuthenticated: boolean; userId?: string }>(url, {
      withCredentials: true,
    });
  }

  logout() {
    const url = `${environment.apiUrl}/auth/logout`;
    return this.http.post(url, {}, { withCredentials: true });
  }
}
