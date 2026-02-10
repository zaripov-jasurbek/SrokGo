import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { MongooseHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CookieParserHealthIndicator } from './indicators/cookie-parser.health';

@Module({
  imports: [
    TerminusModule,
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    HealthModule,
  ],
  controllers: [HealthController],
  providers: [
    MongooseHealthIndicator,
    CookieParserHealthIndicator,
    HttpService,
  ],
  exports: [TerminusModule],
})
export class HealthModule {}
