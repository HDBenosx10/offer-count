import 'reflect-metadata';
import { OfferService } from './offer.service';
import { BalanceRepository } from '../repositories/balance.repository';
import { WalletRepository } from '../repositories/wallet.repository';
import { OfferRepository } from '../repositories/offer.repository';
import { CreateOfferDTO } from '../dtos/createOffer.dto';
import { DeleteOfferDTO } from '../dtos/deleteOffer.dto';
import { ListActiveOffersDTO } from '../dtos/listActiveOffer.dto';
import { ListActiveOffersOutputDTO } from '../dtos/listActiveOfferOutput.dto';
import { Offer } from '../entities/offer.entity';
import { Wallet } from '../entities/wallet.entity';
import { Balance } from '../entities/balance.entity';

describe('OfferService', () => {
  let offerService: OfferService;
  let balanceRepository: BalanceRepository;
  let walletRepository: WalletRepository;
  let offerRepository: OfferRepository;

  beforeEach(() => {
    balanceRepository = {
      findById: jest.fn(),
      findByWalletIdAndTokenId: jest.fn(),
    } as unknown as BalanceRepository;

    walletRepository = {
      findById: jest.fn(),
    } as unknown as WalletRepository;

    offerRepository = {
      findById: jest.fn(),
      getActiveUserOffersCount: jest.fn(),
      findActive: jest.fn(),
      save: jest.fn(),
    } as unknown as OfferRepository;

    offerService = new OfferService(balanceRepository, walletRepository, offerRepository);
  });

  describe('createOffer', () => {
    it('should create an offer successfully', async () => {
      const input: CreateOfferDTO = {
        userId: 'user-id',
        sellerWalletId: 'seller-wallet-id',
        tokenId: 'token-id',
        amount: 10,
        unitPrice: 5,
        currency: 'USD',
      };

      jest.spyOn(walletRepository, 'findById').mockResolvedValueOnce({ id: 'seller-wallet-id', userId: 'user-id' } as Wallet);
      jest.spyOn(offerRepository, 'getActiveUserOffersCount').mockResolvedValueOnce(3);
      jest.spyOn(balanceRepository, 'findByWalletIdAndTokenId').mockResolvedValueOnce({
        id: 'balance-id',
        walletId: 'seller-wallet-id',
        tokenId: 'token-id',
        balance: '100',
      } as Balance);
      jest.spyOn(offerRepository, 'save').mockImplementationOnce(() => Promise.resolve());

      const createdOffer = await offerService.createOffer(input);

      expect(createdOffer).toBeInstanceOf(Offer);
      expect(createdOffer.sellerWalletId).toBe(input.sellerWalletId);
      expect(createdOffer.tokenId).toBe(input.tokenId);
      expect(createdOffer.amount).toBe(input.amount);
      expect(createdOffer.unitPrice).toBe(input.unitPrice);
      expect(createdOffer.currency).toBe(input.currency);
    });

    it('should throw an error when wallet is not found', async () => {
      const input: CreateOfferDTO = {
        userId: 'user-id',
        sellerWalletId: 'seller-wallet-id',
        tokenId: 'token-id',
        amount: 10,
        unitPrice: 5,
        currency: 'USD',
      };

      jest.spyOn(walletRepository, 'findById').mockResolvedValueOnce(null);

      await expect(offerService.createOffer(input)).rejects.toThrow(Error);
    });

    it('should throw an error when maximum offer quantity is reached', async () => {
      const input: CreateOfferDTO = {
        userId: 'user-id',
        sellerWalletId: 'seller-wallet-id',
        tokenId: 'token-id',
        amount: 10,
        unitPrice: 5,
        currency: 'USD',
      };

      jest.spyOn(walletRepository, 'findById').mockResolvedValueOnce({ id: 'seller-wallet-id', userId: 'user-id' } as Wallet);
      jest.spyOn(offerRepository, 'getActiveUserOffersCount').mockResolvedValueOnce(5);

      await expect(offerService.createOffer(input)).rejects.toThrow(Error);
    });

    it('should throw an error when balance is insufficient', async () => {
      const input: CreateOfferDTO = {
        userId: 'user-id',
        sellerWalletId: 'seller-wallet-id',
        tokenId: 'token-id',
        amount: 10,
        unitPrice: 5,
        currency: 'USD',
      };

      jest.spyOn(walletRepository, 'findById').mockResolvedValueOnce({ id: 'seller-wallet-id', userId: 'user-id' } as Wallet);
      jest.spyOn(offerRepository, 'getActiveUserOffersCount').mockResolvedValueOnce(3);
      jest.spyOn(balanceRepository, 'findByWalletIdAndTokenId').mockResolvedValueOnce(null);

      await expect(offerService.createOffer(input)).rejects.toThrow(Error);
    });
  });

  describe('deleteOffer', () => {
    it('should delete an offer successfully', async () => {
      const input: DeleteOfferDTO = {
        userId: 'user-id',
        offerId: 'offer-id',
      };

      const offer = new Offer('offer-id', 'seller-wallet-id', 'token-id', 10, 5, 'USD');
      jest.spyOn(offerRepository, 'findById').mockResolvedValueOnce(offer);
      jest.spyOn(walletRepository, 'findById').mockResolvedValueOnce({ id: 'seller-wallet-id', userId: 'user-id' } as Wallet);
      jest.spyOn(offerRepository, 'save').mockImplementationOnce(() => Promise.resolve());

      await offerService.deleteOffer(input);

      expect(offer.isActive).toBe(false);
    });

    it('should throw an error when offer is not found', async () => {
      const input: DeleteOfferDTO = {
        userId: 'user-id',
        offerId: 'offer-id',
      };

      jest.spyOn(offerRepository, 'findById').mockResolvedValueOnce(null);

      await expect(offerService.deleteOffer(input)).rejects.toThrow(Error);
    });

    it('should throw an error when wallet is not found', async () => {
      const input: DeleteOfferDTO = {
        userId: 'user-id',
        offerId: 'offer-id',
      };

      const offer = new Offer('offer-id', 'seller-wallet-id', 'token-id', 10, 5, 'USD');
      jest.spyOn(offerRepository, 'findById').mockResolvedValueOnce(offer);
      jest.spyOn(walletRepository, 'findById').mockResolvedValueOnce(null);

      await expect(offerService.deleteOffer(input)).rejects.toThrow(Error);
    });
  });

  describe('listActiveOffers', () => {
    it('should return a list of active offers', async () => {
      const input: ListActiveOffersDTO = {
        page: 1,
        limit: 10,
      };

      const activeOffers: ListActiveOffersOutputDTO = {
        offers: [
          { id: 'offer-id-1', sellerWalletId: 'wallet-id-1', tokenId: 'token-id-1', amount: 5, unitPrice: 10 },
          { id: 'offer-id-2', sellerWalletId: 'wallet-id-2', tokenId: 'token-id-2', amount: 8, unitPrice: 20 },
        ] as Offer[],
        pageCount: 2,
      };

      jest.spyOn(offerRepository, 'findActive').mockResolvedValueOnce(activeOffers);

      const result = await offerService.listActiveOffers(input);

      expect(result).toEqual(activeOffers);
    });
  });
});
