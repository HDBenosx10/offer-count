import { inject, injectable } from 'tsyringe';
import { CreateOfferDTO } from '../dtos/createOffer.dto';
import { DeleteOfferDTO } from '../dtos/deleteOffer.dto';
import { ListActiveOffersDTO } from '../dtos/listActiveOffer.dto';
import { ListActiveOffersOutputDTO } from '../dtos/listActiveOfferOutput.dto';
import { Offer } from '../entities/offer.entity';
import { BalanceRepository } from '../repositories/balance.repository';
import { OfferRepository } from '../repositories/offer.repository';
import { WalletRepository } from '../repositories/wallet.repository';

@injectable()
export class OfferService {
  private readonly MAX_OFFER_PER_USER = 5;
  constructor(
    @inject('BalanceRepository')
    private readonly balanceRepository: BalanceRepository,
    @inject('WalletRepository')
    private readonly walletRepository: WalletRepository,
    @inject('OfferRepository')
    private readonly offerRepository: OfferRepository
  ){}

  async createOffer(input: CreateOfferDTO): Promise<Offer> {
    const wallet = await this.walletRepository.findById(input.sellerWalletId);
    if(!wallet || wallet.userId !== input.userId) throw new Error('Wallet not found');
    const offerCount = await this.offerRepository.getActiveUserOffersCount(input.userId);
    if(offerCount >= this.MAX_OFFER_PER_USER ) throw new Error('Maximum offer quantity reached');
    const balance = await this.balanceRepository.findByWalletIdAndTokenId(wallet.id, input.tokenId);
    if(!balance || Number(balance.balance) < input.unitPrice * input.amount) throw new Error('Insuficience balance');
    const offer = Offer.create(
      input.sellerWalletId,
      input.tokenId,
      input.amount,
      input.unitPrice,
      input.currency
    );
    await this.offerRepository.save(offer);
    return offer;
  }

  async deleteOffer(input: DeleteOfferDTO): Promise<void> {
    const offer = await this.offerRepository.findById(input.offerId);
    if(!offer) throw new Error('Offer not found');
    const wallet = await this.walletRepository.findById(offer.sellerWalletId);
    if(!wallet || wallet.userId !== input.userId) throw new Error('Wallet not found');
    offer.disable();
    await this.offerRepository.save(offer);
  }

  async listActiveOffers(input: ListActiveOffersDTO): Promise<ListActiveOffersOutputDTO> {
    return this.offerRepository.findActive(input.page, input.limit);
  }
}
