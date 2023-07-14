import { Logger } from './logger';

export class ConsoleLogger implements Logger {
  async warn(msg: string, errorObj: Record<string, unknown>): Promise<void> {
    console.warn(msg);
    console.error('Error Object:', errorObj);
  }

  async error(msg: string, errorObj: Record<string, unknown>): Promise<void> {
    console.error(msg);
    console.error('Error Object:', errorObj);
  }
}
