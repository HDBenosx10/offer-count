import { container } from 'tsyringe';
import { Logger } from './infrastructure/logger/logger';
import { ConsoleLogger } from './infrastructure/logger/consoleLogger';
import { BalanceRepository } from './domain/repositories/balance.repository';
import { PgBalanceRepository } from './infrastructure/database/pg/repositories/balance.repository';
import { WalletRepository } from './domain/repositories/wallet.repository';
import { PgWalletRepository } from './infrastructure/database/pg/repositories/wallet.repository';
import { OfferRepository } from './domain/repositories/offer.repository';
import { PgOfferRepository } from './infrastructure/database/pg/repositories/offer.repository';
import { CacheManager } from './infrastructure/cache/cacheManager';
import { ListActiveOffersOutputDTO } from './domain/dtos/listActiveOfferOutput.dto';
import { ListOffersCacheManager } from './infrastructure/cache/redis/offer/listOffers.cache';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { redisClient } from './infrastructure/cache/redis/redis';

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient()
});
container.register<Redis>('Redis', {
  useValue: redisClient
});
container.register<Logger>('Logger', {
  useClass: ConsoleLogger
});
container.register<BalanceRepository>('BalanceRepository', {
  useClass: PgBalanceRepository
});
container.register<WalletRepository>('WalletRepository', {
  useClass: PgWalletRepository
});
container.register<OfferRepository>('OfferRepository', {
  useClass: PgOfferRepository
});
container.register<CacheManager<ListActiveOffersOutputDTO>>('ListOfferCacheManager', {
  useClass: ListOffersCacheManager
});



