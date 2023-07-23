import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.emailService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.emailService.createOrder(data);
    this.rmqService.ack(context);
  }

  @EventPattern('payment_initiated')
  async handlePaymentCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.emailService.initiatePayment(data);
    this.rmqService.ack(context);
  }

  @EventPattern('payment_events')
  async handlePaymentEvents(@Payload() data: any, @Ctx() context: RmqContext) {
    this.emailService.updatePayment(data);
    this.rmqService.ack(context);
  }
}
