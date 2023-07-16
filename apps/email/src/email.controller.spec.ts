import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
  let billingController: EmailController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [EmailService],
    }).compile();

    billingController = app.get<EmailController>(EmailController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingController.getHello()).toBe('Hello World!');
    });
  });
});
