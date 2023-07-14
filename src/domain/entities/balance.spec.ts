import { Balance } from './balance.entity';
import { DomainValidationError } from '../errors/domainValidation.error';

describe('Balance', () => {
  describe('constructor', () => {
    it('should create a valid instance', () => {
      const id = 'balance-id';
      const walletId = 'wallet-id';
      const balance = '100';
      const tokenId = 'token-id';

      const balanceInstance = new Balance(id, walletId, balance, tokenId);

      expect(balanceInstance).toBeDefined();
      expect(balanceInstance.id).toBe(id);
      expect(balanceInstance.walletId).toBe(walletId);
      expect(balanceInstance.balance).toBe(balance);
      expect(balanceInstance.tokenId).toBe(tokenId);
    });
  });

  describe('validate', () => {
    it('should throw DomainValidationError when id is invalid', () => {
      const id = '';
      const walletId = 'wallet-id';
      const balance = '100';
      const tokenId = 'token-id';

      expect(() => new Balance(id, walletId, balance, tokenId)).toThrow(DomainValidationError);
    });
    it('should throw DomainValidationError when walletId is invalid', () => {
      const id = 'balance-id';
      const walletId = '';
      const balance = '100';
      const tokenId = 'token-id';

      expect(() => new Balance(id, walletId, balance, tokenId)).toThrow(DomainValidationError);
    });
    it('should throw DomainValidationError when balance is invalid', () => {
      const id = 'balance-id';
      const walletId = 'wallet-id';
      const balance = '';
      const tokenId = 'token-id';

      expect(() => new Balance(id, walletId, balance, tokenId)).toThrow(DomainValidationError);
    });
    it('should throw DomainValidationError when token is invalid', () => {
      const id = 'balance-id';
      const walletId = 'wallet-id';
      const balance = '100';
      const tokenId = '';

      expect(() => new Balance(id, walletId, balance, tokenId)).toThrow(DomainValidationError);
    });
  });

  describe('create', () => {
    it('should create a new instance with a generated id', () => {
      const walletId = 'wallet-id';
      const balance = '100';
      const tokenId = 'token-id';
      const balanceInstance = Balance.create(walletId, balance, tokenId);

      expect(balanceInstance).toBeDefined();
      expect(balanceInstance.id).toBeDefined();
      expect(balanceInstance.walletId).toBe(walletId);
      expect(balanceInstance.balance).toBe(balance);
      expect(balanceInstance.tokenId).toBe(tokenId);
    });
  });
});
