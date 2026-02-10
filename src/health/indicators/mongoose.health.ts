import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseHealthIndicator extends HealthIndicator {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Проверяем подключение к MongoDB
      const dbState = this.connection.readyState;
      const isHealthy = dbState === 1; // 1 = connected

      const result = this.getStatus(key, isHealthy, {
        state: this.getStateDescription(dbState),
        readyState: dbState,
      });

      if (isHealthy) {
        return result;
      }

      throw new HealthCheckError('Mongoose health check failed', result);
    } catch (error) {
      const result = this.getStatus(key, false, {
        error: error.message,
      });
      throw new HealthCheckError('Mongoose health check failed', result);
    }
  }

  private getStateDescription(state: number): string {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized',
    };
    return states[state] || 'unknown';
  }
}
