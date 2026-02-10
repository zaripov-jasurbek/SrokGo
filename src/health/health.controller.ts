// health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { MongooseHealthIndicator } from './indicators/mongoose.health';
import { CookieParserHealthIndicator } from './indicators/cookie-parser.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
    private cookieParserHealth: CookieParserHealthIndicator,
  ) {}

  @Get('live')
  @HealthCheck()
  async liveness(): Promise<HealthCheckResult> {
    // Liveness check - проверка, что приложение запущено
    const indicators: HealthIndicatorFunction[] = [
      () => this.cookieParserHealth.isHealthy('cookie-parser'),
    ];

    return this.health.check(indicators);
  }

  @Get('ready')
  @HealthCheck()
  async readiness(): Promise<HealthCheckResult> {
    // Readiness check - проверка, что приложение готово обслуживать запросы
    const indicators: HealthIndicatorFunction[] = [
      () => this.mongooseHealth.isHealthy('database'),
      () => this.cookieParserHealth.isHealthy('cookie-parser'),
    ];

    return this.health.check(indicators);
  }
}
