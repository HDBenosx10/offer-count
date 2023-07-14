import { Wallet } from './wallet.entity';
import { DomainValidationError } from '../errors/domainValidation.error';

describe('Wallet', () => {
  describe('constructor', () => {
    it('should create a valid instance', () => {
      const id = 'wallet-id';
      const userId = 'user-id';
      const code = 123;
      const alias = 'wallet-alias';

      const walletInstance = new Wallet(id, userId, code, alias);

      expect(walletInstance).toBeDefined();
      expect(walletInstance.id).toBe(id);
      expect(walletInstance.userId).toBe(userId);
      expect(walletInstance.code).toBe(code);
      expect(walletInstance.alias).toBe(alias);
    });
  });

  describe('validate', () => {
    it('should throw DomainValidationError when id is invalid', () => {
      const id = '';
      const userId = 'user-id';
      const code = 123;
      const alias = 'wallet-alias';

      expect(() => new Wallet(id, userId, code, alias)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when userId is invalid', () => {
      const id = 'wallet-id';
      const userId = '';
      const code = 123;
      const alias = 'wallet-alias';

      expect(() => new Wallet(id, userId, code, alias)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when code is invalid', () => {
      const id = 'wallet-id';
      const userId = 'user-id';
      const code = NaN;
      const alias = 'wallet-alias';

      expect(() => new Wallet(id, userId, code, alias)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when alias is invalid', () => {
      const id = 'wallet-id';
      const userId = 'user-id';
      const code = 123;
      const alias = '';

      expect(() => new Wallet(id, userId, code, alias)).toThrow(DomainValidationError);
    });
  });

  describe('create', () => {
    it('should create a new instance with a generated id', () => {
      const userId = 'user-id';
      const code = 123;
      const alias = 'wallet-alias';

      const walletInstance = Wallet.create(userId, code, alias);

      expect(walletInstance).toBeDefined();
      expect(walletInstance.id).toBeDefined();
      expect(walletInstance.userId).toBe(userId);
      expect(walletInstance.code).toBe(code);
      expect(walletInstance.alias).toBe(alias);
    });
  });
});
