import { PrismaClient } from '@prisma/client';
import { WalletRepository } from '../../../../domain/repositories/wallet.repository';
import { Wallet } from '../../../../domain/entities/wallet.entity';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PgWalletRepository implements WalletRepository {
  constructor(@inject('PrismaClient') private readonly prismaClient: PrismaClient) {}
  async findById(id: string): Promise<Wallet | null> {
    const result = await this.prismaClient.wallets.findUnique({
      where: {
        id
      }
    });
    if(!result) return null;
    return new Wallet(
      result.id,
      result.userId,
      result.code,
      result.alias
    );
  }
}

