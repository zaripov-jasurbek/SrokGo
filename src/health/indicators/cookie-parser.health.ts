import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

type RequestWithCookies = Request & { cookies?: Record<string, string> };

@Injectable()
export class CookieParserHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const testCookie = 'test=health-check';
      const reqMock = {
        headers: { cookie: testCookie },
      };
      const resMock = { setHeader: () => undefined };

      const middleware = cookieParser();

      await new Promise<void>((resolve, reject: (reason: Error) => void) => {
        middleware(
          reqMock as unknown as Request,
          resMock as unknown as Response,
          (err?: unknown) => {
            if (err instanceof Error) {
              reject(err);
              return;
            }

            resolve();
          },
        );
      });

      const isHealthy = typeof (reqMock as RequestWithCookies).cookies !== 'undefined';

      return this.getStatus(key, isHealthy, {
        version: 'available',
        tested: true,
      });
    } catch (error: unknown) {
      return this.getStatus(key, false, {
        error: error instanceof Error ? error.message : 'Unknown error',
        note: 'Cookie parser may not be properly configured',
      });
    }
  }
}
