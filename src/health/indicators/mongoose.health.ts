import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Injectable()
export class MongooseHealthIndicator extends HealthIndicator {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    super();
  }

  isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const dbState = this.connection.readyState;
      const isHealthy = dbState === ConnectionStates.connected;

      const result = this.getStatus(key, isHealthy, {
        state: this.getStateDescription(dbState),
        readyState: dbState,
      });

      if (isHealthy) {
        return Promise.resolve(result);
      }

      return Promise.reject(
        new HealthCheckError('Mongoose health check failed', result),
      );
    } catch (error: unknown) {
      const result = this.getStatus(key, false, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return Promise.reject(
        new HealthCheckError('Mongoose health check failed', result),
      );
    }
  }

  private getStateDescription(state: number): string {
    switch (state as ConnectionStates) {
      case ConnectionStates.disconnected:
        return 'disconnected';
      case ConnectionStates.connected:
        return 'connected';
      case ConnectionStates.connecting:
        return 'connecting';
      case ConnectionStates.disconnecting:
        return 'disconnecting';
      case ConnectionStates.uninitialized:
        return 'uninitialized';
      default:
        return 'unknown';
    }
  }
}
