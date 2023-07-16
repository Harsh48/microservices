import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { BillingModule } from './billing.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  console.log('hello'+ app.connectMicroservice(rmqService.getOptions('EMAIL')))
  await app.listen(configService.get('PORT'));
}
bootstrap();
