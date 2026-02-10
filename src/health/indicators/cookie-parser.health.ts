import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import cookieParser from 'cookie-parser';

@Injectable()
export class CookieParserHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Проверяем наличие модуля cookie-parser
      const cookieParserModule = require('cookie-parser');

      // Тестируем базовую функциональность
      const testCookie = 'test=health-check';
      const req = { headers: { cookie: testCookie } };
      const res = { setHeader: () => {} };

      const middleware = cookieParser();

      // Имитируем вызов middleware
      await new Promise((resolve, reject) => {
        middleware(req as any, res as any, (err: any) => {
          if (err) reject(err);
          else resolve(null);
        });
      });

      const isHealthy = req.hasOwnProperty('cookies');
      return this.getStatus(key, isHealthy, {
        version: cookieParserModule.toString ? 'available' : 'unknown',
        tested: true,
      });
    } catch (error) {
      return this.getStatus(key, false, {
        error: error.message,
        note: 'Cookie parser may not be properly configured',
      });
    }
  }
}
