import { Balance } from '../entities/balance.entity';

export interface BalanceRepository {
  findByWalletIdAndTokenId(walletId: string, tokenId: string): Promise<Balance | null>
}
