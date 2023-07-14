import { Wallet } from '../entities/wallet.entity';

export interface WalletRepository {
  findById(id: string): Promise<Wallet | null>
}
