import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Billing } from './schemas/billing.schema';

@Injectable()
export class billingRepository extends AbstractRepository<Billing> {
  protected readonly logger = new Logger(billingRepository.name);

  constructor(
    @InjectModel(Billing.name) orderModel: Model<Billing>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
