import { trxType } from './enumerators';

export interface trx {
  label: string;
  amount: number;
  date: string;
  type: trxType;
}

export interface DataPoint {
  date: string;
  data: number;
}

export interface Gradient {
  top: string;
  bottom: string;
}
