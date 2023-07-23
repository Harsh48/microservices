import { Inject, Injectable, Logger } from '@nestjs/common';
import { BillingRepository } from './billing.repository';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentRequest } from './dto/create-payment.request';
import { EMAIL_SERVICE, ORDER_SERVICE } from './constants/services';
import { lastValueFrom } from 'rxjs';
import mongoose from 'mongoose';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private readonly billingRepository: BillingRepository,
    @Inject(EMAIL_SERVICE) private emailClient: ClientProxy,
    @Inject(ORDER_SERVICE) private orderClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }


  async initiatePayment(request: CreatePaymentRequest) {
    const session = await this.billingRepository.startTransaction();
    try {
      const order = await this.billingRepository.create({...request, status: 'created'}, { session });
      await lastValueFrom(
        this.emailClient.emit('payment_initiated', {
          request
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updatePayment(request) {
    console.log(request)
      await lastValueFrom(
        this.orderClient.emit('payment_events', {
          request
        }),
      );
      return await this.billingRepository.findOneAndUpdate({_id: new mongoose.Types.ObjectId(request.id)}, {status: request.status})
  }

  async getPayments(payment_id) {
    return this.billingRepository.findOne({_id: new mongoose.Types.ObjectId(payment_id)});
  }
}
