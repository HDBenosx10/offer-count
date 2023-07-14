export interface Logger {
  warn(msg: string, errorObj: Record<string,unknown>): Promise<void>
  error(msg: string, errorObj: Record<string,unknown>): Promise<void>
}
