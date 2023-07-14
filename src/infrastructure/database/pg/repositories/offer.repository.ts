import { PrismaClient } from '@prisma/client';
import { OfferRepository } from '../../../../domain/repositories/offer.repository';
import { ListActiveOffersOutputDTO } from '../../../../domain/dtos/listActiveOfferOutput.dto';
import { Offer } from '../../../../domain/entities/offer.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PgOfferRepository implements OfferRepository {
  constructor(@inject('PrismaClient') private readonly prismaClient: PrismaClient) {}
  async save(offer: Offer): Promise<void> {
    await this.prismaClient.offers.upsert({
      where: {id: offer.id},
      update:{
        amount: offer.amount,
        unitPrice: offer.unitPrice,
        isActive: offer.isActive,
      },
      create: {
        id: offer.id,
        sellerWalletId: offer.sellerWalletId,
        tokenId: offer.tokenId,
        amount: offer.amount,
        unitPrice: offer.unitPrice,
        currency: offer.currency,
        isActive: offer.isActive,
        expirationDate: new Date(offer.expirationDate),
      }
    });
  }
  async findById(id: string): Promise<Offer | null> {
    const result = await this.prismaClient.offers.findUnique({
      where: {
        id
      }
    });
    if(!result) return null;
    return new Offer(
      result.id,
      result.sellerWalletId,
      result.tokenId,
      result.amount,
      result.unitPrice,
      result.currency,
      result.isActive,
      result.expirationDate
    );
  }
  async getActiveUserOffersCount(userId: string): Promise<number> {
    const result = await this.prismaClient.offers.count({
      where: {
        seller: {
          userId
        }
      }
    });

    return result;
  }
  async findActive(page: number, limit: number): Promise<ListActiveOffersOutputDTO> {
    const currentDate = new Date();
    const offers = await this.prismaClient.offers.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isActive: true,
        expirationDate: {
          gt: currentDate
        }
      }
    });
    const pageCount = await this.prismaClient.offers.count({
      where: {
        isActive: true,
        expirationDate: {
          gt: currentDate
        }
      }
    });
    return {
      offers: offers.map(offer => new Offer(
        offer.id,
        offer.sellerWalletId,
        offer.tokenId,
        offer.amount,
        offer.unitPrice,
        offer.currency,
        offer.isActive,
        offer.expirationDate
      )),
      pageCount
    };
  }

}
