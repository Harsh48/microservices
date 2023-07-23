import { Module } from '@nestjs/common';
import { DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Billing, BillingSchema } from './schemas/billing.schema';
import { BillingRepository } from './billing.repository';
import { EMAIL_SERVICE, ORDER_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/billing/.env',
    }),
    DatabaseModule,
    RmqModule.register({
      name: EMAIL_SERVICE,
    }),
    RmqModule.register({
      name: ORDER_SERVICE,
    }),
    MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }]),
  ],
  controllers: [BillingController],
  providers: [BillingService, BillingRepository],
})
export class BillingModule {}
