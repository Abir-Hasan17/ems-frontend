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

  createTransaction(data: create_transaction_request) {
    const url = `${this.baseUrl}/create`;
    return this.http.post<transaction>(url, data, { withCredentials: true });
  }

  // Update a transaction by ID
  updateTransaction(id: string, data: create_transaction_request) {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<transaction>(url, data, { withCredentials: true });
  }

  // Delete a transaction by ID
  deleteTransaction(id: string) {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<{ message: string }>(url, {
      withCredentials: true,
    });
  }
}

export interface transaction {
  _id: string;
  userId: string;
  label: string;
  amount: number;
  type: 'income' | 'expense';
  note?: string;
  transactionDate: Date;
  modificationDate: Date;
}

export type create_transaction_request = Omit<transaction, '_id'>;

export function getTotal(trx: transaction[]): number {
  return trx.reduce((sum, income) => sum + income.amount, 0);
}
