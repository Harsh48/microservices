import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreatePaymentRequest } from './dto/create-payment.request';
//import { MessagePattern } from '@nestjs/microservices';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
  ) { }

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @Post()
  //@MessagePattern({ cmd: 'initiate_payment' })
  async initiatePayment(@Body() request: CreatePaymentRequest) {
    return this.billingService.initiatePayment(request);
  }

  @Patch('/:id')
  async updatePayment(@Param('id') id,
    @Body() request: any) {
    return this.billingService.updatePayment({id, status: request.status});
  }

  @Get('/:id')
  async getOrders(@Param('id') order_id) {
    return this.billingService.getPayments(order_id);
  }
}
