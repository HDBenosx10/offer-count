import { Tokens } from './token.entity';
import { DomainValidationError } from '../errors/domainValidation.error';

describe('Tokens', () => {
  describe('constructor', () => {
    it('should create a valid instance', () => {
      const id = 'token-id';
      const name = 'Token Name';
      const symbol = 123;
      const precision = '2';

      const tokensInstance = new Tokens(id, name, symbol, precision);

      expect(tokensInstance).toBeDefined();
      expect(tokensInstance.id).toBe(id);
      expect(tokensInstance.name).toBe(name);
      expect(tokensInstance.symbol).toBe(symbol);
      expect(tokensInstance.precision).toBe(precision);
    });
  });

  describe('validate', () => {
    it('should throw DomainValidationError when id is invalid', () => {
      const id = '';
      const name = 'Token Name';
      const symbol = 123;
      const precision = '2';

      expect(() => new Tokens(id, name, symbol, precision)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when name is invalid', () => {
      const id = 'token-id';
      const name = '';
      const symbol = 123;
      const precision = '2';

      expect(() => new Tokens(id, name, symbol, precision)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when symbol is invalid', () => {
      const id = 'token-id';
      const name = 'Token Name';
      const symbol = NaN;
      const precision = '2';

      expect(() => new Tokens(id, name, symbol, precision)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when precision is invalid', () => {
      const id = 'token-id';
      const name = 'Token Name';
      const symbol = 123;
      const precision = '';

      expect(() => new Tokens(id, name, symbol, precision)).toThrow(DomainValidationError);
    });
  });

  describe('create', () => {
    it('should create a new instance with a generated id', () => {
      const name = 'Token Name';
      const symbol = 123;
      const precision = '2';

      const tokensInstance = Tokens.create(name, symbol, precision);

      expect(tokensInstance).toBeDefined();
      expect(tokensInstance.id).toBeDefined();
      expect(tokensInstance.name).toBe(name);
      expect(tokensInstance.symbol).toBe(symbol);
      expect(tokensInstance.precision).toBe(precision);
    });
  });
});
