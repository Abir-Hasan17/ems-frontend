import { trxType } from './enumerators';

export interface trx {
  label: string;
  amount: number;
  date: string;
  type: trxType;
}
