import { Inject, Injectable, Logger } from '@nestjs/common';
import { billingRepository } from './billing.repository';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentRequest } from './dto/create-payment.request';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private readonly billingRepository: billingRepository,
    // @Inject(EMAIL_SERVICE) private emailClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    this.logger.log('Billing...', data);
  }

  async initiatePayment(request: CreatePaymentRequest) {
    const session = await this.billingRepository.startTransaction();
    try {
      const order = await this.billingRepository.create({...request, status: 'created'}, { session });
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}
