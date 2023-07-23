import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  getHello(): string {
    return 'Hello World!';
  }

  createOrder(data: any) {
    this.logger.log('email...', data);
  }

  initiatePayment(data: any) {
    this.logger.log('email payment...', data);
  }

  updatePayment(data: any) {
    this.logger.log('email update payment...', data);
  }
}
