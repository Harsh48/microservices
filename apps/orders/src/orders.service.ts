import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EMAIL_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import axios from 'axios';
import mongoose from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(EMAIL_SERVICE) private emailClient: ClientProxy,
  ) { }

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create({...request, status: 'created'}, { session });
      await lastValueFrom(
        this.emailClient.emit('order_created', {
          request
        }),
      );
      const data: any = await axios({
        method: 'post',
        url: `http://billing:3002/billing`,
        data: request
      });
      await session.commitTransaction();
      await this.ordersRepository.findOneAndUpdate({ _id: order._id }, { payment_id: data._id, status: 'payment_initiated', order_email_sent: true, payment_email_sent: true })
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders(order_id) {
    return this.ordersRepository.findOne({_id: new mongoose.Types.ObjectId(order_id)});
  }

  async updateOrders(payload) {
    await lastValueFrom(
      this.emailClient.emit('payment_events', {
        payload
      }),
    );
    return  await this.ordersRepository.findOneAndUpdate({ payment_id: payload.id }, { status: payload.status})
  }
}
