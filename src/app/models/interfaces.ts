import { trxType } from './enumerators';

export interface trx {
  label: string;
  amount: number;
  date: string;
  type: trxType;
}

export interface BalancePoint {
  date: string;
  balance: number;
}
