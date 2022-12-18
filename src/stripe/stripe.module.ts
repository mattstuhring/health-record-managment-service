import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';

@Module({
  providers: [StripeService],
  imports: [ConfigModule],
})
export class StripeModule {}
