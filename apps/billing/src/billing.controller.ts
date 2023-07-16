import { Body, Controller, Get, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreatePaymentRequest } from './dto/create-payment.request';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @Post()
  async initiatePayment(@Body() request: CreatePaymentRequest) {
    return this.billingService.initiatePayment(request);
  }
}
