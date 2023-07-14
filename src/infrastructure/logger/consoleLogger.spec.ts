import { ConsoleLogger } from './consoleLogger';

describe('ConsoleLogger', () => {
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should log a warning message with error object', async () => {
    const logger = new ConsoleLogger();
    const message = 'This is a warning message';
    const errorObject = { code: 500, message: 'Internal Server Error' };

    await logger.warn(message, errorObject);

    expect(consoleWarnSpy).toHaveBeenCalledWith(message);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error Object:', errorObject);
  });

  it('should log an error message with error object', async () => {
    const logger = new ConsoleLogger();
    const message = 'This is an error message';
    const errorObject = { code: 404, message: 'Not Found' };

    await logger.error(message, errorObject);

    expect(consoleErrorSpy).toHaveBeenCalledWith(message);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error Object:', errorObject);
  });
});
