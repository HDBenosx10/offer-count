import { ListActiveOffersOutputDTO } from '../dtos/listActiveOfferOutput.dto';
import { Offer } from '../entities/offer.entity';

export interface OfferRepository {
  save(offer: Offer): Promise<void>
  findById(offerId: string): Promise<Offer | null>
  getActiveUserOffersCount(userId: string): Promise<number>
  findActive(page: number, limit: number): Promise<ListActiveOffersOutputDTO>
}
