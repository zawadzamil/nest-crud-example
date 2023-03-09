import { Document } from 'mongoose';
export interface IEmployee extends Document {
  readonly name: string;
  readonly phone: string;
  readonly age: number;
}
