import { trxType } from './enumerators';

export interface trx {
  label: string;
  amount: number;
  realDate: Date;
  date: string;
  type: trxType;
  note: string;
}

export interface DataPoint {
  date: string;
  data: number;
}

export interface Gradient {
  top: string;
  bottom: string;
}
