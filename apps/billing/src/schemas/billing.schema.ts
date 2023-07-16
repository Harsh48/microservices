import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Billing extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  amount: number;

  @Prop()
  type: string;

  @Prop()
  status: string;

  @Prop()
  payment_email_sent: Boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Billing);
