import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateOrderRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  payment_id: ObjectId;

  @IsOptional()
  status: string;
 
  @IsOptional()
  @IsBoolean()
  order_email_sent: Boolean;

  @IsOptional()
  @IsBoolean()
  payment_email_sent: Boolean;
}
