import { Offer } from '../../../domain/entities/offer.entity';
import { OfferService } from '../../../domain/services/offer.service';
import { Logger } from '../../../infrastructure/logger/logger';
import { CreateOfferDTO } from '../../../domain/dtos/createOffer.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOffer {
  constructor(
    private readonly offerDomainService: OfferService,
    @inject('Logger') private readonly logger: Logger,
  ) {}

  async execute(input: CreateOfferDTO): Promise<Offer> {
    try {
      return this.offerDomainService.createOffer(input);
    } catch (err) {
      this.logger.error('Error saving Offer', {
        identifier: CreateOffer.name,
        error: err
      });
      throw new Error('Unable to save Offer');
    }
  }
}
