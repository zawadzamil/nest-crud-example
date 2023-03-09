import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Employee {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
EmployeeSchema.index({ phone: 1 }, { unique: true });
EmployeeSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
