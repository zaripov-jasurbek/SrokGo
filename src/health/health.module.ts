import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { MongooseHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { CookieParserHealthIndicator } from './indicators/cookie-parser.health';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [MongooseHealthIndicator, CookieParserHealthIndicator],
  exports: [TerminusModule],
})
export class HealthModule {}
