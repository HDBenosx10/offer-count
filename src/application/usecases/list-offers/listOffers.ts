import { OfferService } from '../../../domain/services/offer.service';
import { Logger } from '../../../infrastructure/logger/logger';
import { ListActiveOffersDTO } from '../../../domain/dtos/listActiveOffer.dto';
import { CacheManager } from '../../../infrastructure/cache/cacheManager';
import { ListActiveOffersOutputDTO } from '../../../domain/dtos/listActiveOfferOutput.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOffers {
  constructor(
    private readonly offerDomainService: OfferService,
    @inject('ListOfferCacheManager')
    private readonly cacheManager: CacheManager<ListActiveOffersOutputDTO>,
    @inject('Logger') private readonly logger: Logger,
  ) {}

  async execute(input: ListActiveOffersDTO): Promise<ListActiveOffersOutputDTO> {
    try {
      const cacheKey = `${ListOffers.name}-${input.page}`;
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;
      const result = await this.offerDomainService.listActiveOffers(input);
      await this.cacheManager.set(cacheKey, result);
      return result;
    } catch (err) {
      this.logger.error('Error getting Offer list', {
        identifier: ListOffers.name,
        error: err
      });
      throw new Error('Unable to get Offer list');
    }
  }
}
