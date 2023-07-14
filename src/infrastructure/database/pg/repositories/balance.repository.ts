import { PrismaClient } from '@prisma/client';
import { BalanceRepository } from '../../../../domain/repositories/balance.repository';
import { Balance } from '../../../../domain/entities/balance.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PgBalanceRepository implements BalanceRepository {
  constructor(@inject('PrismaClient') private readonly prismaClient: PrismaClient) {}
  async findByWalletIdAndTokenId(walletId: string, tokenId: string): Promise<Balance | null> {
    const result = await this.prismaClient.balances.findUnique({
      where: {
        walletId_tokenId: {
          walletId,
          tokenId
        }
      }
    });
    if(!result) return null;
    return new Balance(
      result.id,
      result.walletId,
      result.balance,
      result.tokenId
    );
  }
}
