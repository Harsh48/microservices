import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePaymentRequest {
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
  status: string;

  @IsOptional()
  @IsBoolean()
  payment_email_sent: Boolean;
}
