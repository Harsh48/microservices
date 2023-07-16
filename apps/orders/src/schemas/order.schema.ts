import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { ObjectId } from 'mongoose';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  amount: number;

  @Prop()
  type: string;

  @Prop()
  payment_id: ObjectId;

  @Prop()
  status: string;

  @Prop()
  order_email_sent: Boolean;

  @Prop()
  payment_email_sent: Boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
