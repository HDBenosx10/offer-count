import Redis from 'ioredis';
import { CacheManager } from '../../cacheManager';
import { ListActiveOffersOutputDTO } from '../../../../domain/dtos/listActiveOfferOutput.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOffersCacheManager implements CacheManager<ListActiveOffersOutputDTO> {
  constructor(@inject('Redis') private readonly redisClient: Redis){}
  async get(key: string): Promise<ListActiveOffersOutputDTO | null> {
    const redisGet = await this.redisClient.get(key);
    if(!redisGet) return null;
    const cached = JSON.parse(redisGet);
    return { pageCount: cached.pageCount, offers: cached.offers };
  }
  async set(key: string, value: ListActiveOffersOutputDTO | string): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', 60);
  }
}
