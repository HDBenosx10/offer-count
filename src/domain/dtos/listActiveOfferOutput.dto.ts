import { Offer } from '../entities/offer.entity';

export interface ListActiveOffersOutputDTO {
  pageCount: number;
  offers: Offer[];
}
