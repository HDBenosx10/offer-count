import { OfferService } from '../../../domain/services/offer.service';
import { Logger } from '../../../infrastructure/logger/logger';
import { DeleteOfferDTO } from '../../../domain/dtos/deleteOffer.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteOffer {
  constructor(
    private readonly offerDomainService: OfferService,
    @inject('Logger') private readonly logger: Logger,
  ) {}

  async execute(input: DeleteOfferDTO): Promise<void> {
    try {
      await this.offerDomainService.deleteOffer(input);
    } catch (err) {
      this.logger.error('Error deleting Offer', {
        identifier: DeleteOffer.name,
        error: err
      });
      throw new Error('Unable to delete Offer');
    }
  }
}
