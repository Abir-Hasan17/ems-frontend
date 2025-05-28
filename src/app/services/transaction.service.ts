import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/transactions`;

  getTransactionsByUserId(userId: string) {
    const url = `${this.baseUrl}/transactions-by-user-id/${userId}`;
    return this.http.get<transaction[]>(url, { withCredentials: true });
  }
}

export interface transaction {
  _id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}
