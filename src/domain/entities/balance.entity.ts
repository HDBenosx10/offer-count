import { DomainValidationError } from '../errors/domainValidation.error';
import crypto from 'crypto';

export class Balance {
  private _id: string;
  private _walletId: string;
  private _tokenId: string;
  private _balance: string;

  constructor(id: string, walletId: string, balance: string, tokenId: string) {
    this._id = id;
    this._walletId = walletId;
    this._balance = balance;
    this._tokenId = tokenId;
    this.validate();
  }

  static create(walletId: string, balance: string, tokenId: string) {
    const id = crypto.randomUUID();
    return new Balance(id, walletId, balance, tokenId);
  }

  validate() {
    if(this._id.length === 0) {
      throw new DomainValidationError('Invalid id');
    }
    if(this._walletId.length === 0) {
      throw new DomainValidationError('Invalid walletId');
    }
    if(this._balance.length === 0) {
      throw new DomainValidationError('Invalid balance');
    }
    if(this._tokenId.length === 0) {
      throw new DomainValidationError('Invalid tokenId');
    }
  }

  get id(): string {
    return this._id;
  }

  get balance(): string {
    return this._balance;
  }

  get walletId(): string {
    return this._walletId;
  }

  get tokenId(): string {
    return this._tokenId;
  }

}
