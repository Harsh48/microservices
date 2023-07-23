import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly rmqService: RmqService,) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request);
  }

  @EventPattern('payment_events')
  async handlePaymentEvents(@Payload() data: any, @Ctx() context: RmqContext) {
    this.ordersService.updateOrders(data);
    this.rmqService.ack(context);
  }

  @Get('/:id')
  async getOrders(@Param('id') order_id) {
    return this.ordersService.getOrders(order_id);
  }
}
