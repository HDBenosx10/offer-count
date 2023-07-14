import { Offer } from './offer.entity';
import { DomainValidationError } from '../errors/domainValidation.error';

describe('Offer', () => {
  describe('constructor', () => {
    it('should create a valid instance with default values', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';

      const offerInstance = new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency);

      expect(offerInstance).toBeDefined();
      expect(offerInstance.id).toBe(id);
      expect(offerInstance.sellerWalletId).toBe(sellerWalletId);
      expect(offerInstance.tokenId).toBe(tokenId);
      expect(offerInstance.amount).toBe(amount);
      expect(offerInstance.unitPrice).toBe(unitPrice);
      expect(offerInstance.currency).toBe(currency);
      expect(offerInstance.isActive).toBe(true);
      expect(typeof offerInstance.expirationDate).toBe('number');
    });

    it('should create a valid instance with custom values', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';
      const isActive = false;
      const expirationDate = new Date('2022-01-01');

      const offerInstance = new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency, isActive, expirationDate);

      expect(offerInstance).toBeDefined();
      expect(offerInstance.id).toBe(id);
      expect(offerInstance.sellerWalletId).toBe(sellerWalletId);
      expect(offerInstance.tokenId).toBe(tokenId);
      expect(offerInstance.amount).toBe(amount);
      expect(offerInstance.unitPrice).toBe(unitPrice);
      expect(offerInstance.currency).toBe(currency);
      expect(offerInstance.isActive).toBe(isActive);
      expect(offerInstance.expirationDate).toBe(expirationDate.getTime());
    });
  });

  describe('validate', () => {

    it('should throw DomainValidationError when id is invalid', () => {
      const id = '';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';

      expect(() => new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when sellerWalletId is invalid', () => {
      const id = 'offer-id';
      const sellerWalletId = '';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';

      expect(() => new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when tokenId is invalid', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = '';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';

      expect(() => new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when amount is negative', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = -10;
      const unitPrice = 100;
      const currency = 'USD';

      expect(() => new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when unitPrice is negative', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = -100;
      const currency = 'USD';

      expect(() => new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when currency is invalid', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = '';

      expect(() => new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency)).toThrow(DomainValidationError);
    });
  });

  describe('create', () => {
    it('should create a new instance with a generated id', () => {
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';

      const offerInstance = Offer.create(sellerWalletId, tokenId, amount, unitPrice, currency);

      expect(offerInstance).toBeDefined();
      expect(offerInstance.id).toBeDefined();
      expect(offerInstance.sellerWalletId).toBe(sellerWalletId);
      expect(offerInstance.tokenId).toBe(tokenId);
      expect(offerInstance.amount).toBe(amount);
      expect(offerInstance.unitPrice).toBe(unitPrice);
      expect(offerInstance.currency).toBe(currency);
      expect(offerInstance.isActive).toBe(true);
      expect(typeof offerInstance.expirationDate).toBe('number');
    });
  });

  describe('enable', () => {
    it('should set isActive property to true', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';
      const offerInstance = new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency, false);

      offerInstance.enable();

      expect(offerInstance.isActive).toBe(true);
    });
  });

  describe('disable', () => {
    it('should set isActive property to false', () => {
      const id = 'offer-id';
      const sellerWalletId = 'seller-wallet-id';
      const tokenId = 'token-id';
      const amount = 10;
      const unitPrice = 100;
      const currency = 'USD';
      const offerInstance = new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency, true);

      offerInstance.disable();

      expect(offerInstance.isActive).toBe(false);
    });
  });
});
