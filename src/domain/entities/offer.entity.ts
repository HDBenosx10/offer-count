import { DomainValidationError } from '../errors/domainValidation.error';
import crypto from 'crypto';

export class Offer {
  private _id: string;
  private _sellerWalletId: string;
  private _tokenId: string;
  private _amount: number;
  private _unitPrice: number;
  private _currency: string;
  private _isActive: boolean;
  private _expirationDate: number;

  constructor(id: string, sellerWalletId: string, tokenId: string, amount: number, unitPrice: number, currency: string, isActive?: boolean, expirationDate?: Date) {
    this._id = id;
    this._sellerWalletId = sellerWalletId;
    this._tokenId = tokenId;
    this._amount = amount;
    this._unitPrice = unitPrice;
    this._currency = currency;
    this._expirationDate = expirationDate ? new Date(expirationDate).getTime() : this.calculateExpirationDate();
    this._isActive = isActive !== undefined ? isActive : true;
    this.validate();
  }

  static create(sellerWalletId: string, tokenId: string, amount: number, unitPrice: number, currency: string) {
    const id = crypto.randomUUID();
    return new Offer(id, sellerWalletId, tokenId, amount, unitPrice, currency);
  }

  private calculateExpirationDate() {
    const current = new Date();
    return new Date(current).setUTCDate(current.getUTCDate() + 1);
  }

  enable() {
    this._isActive = true;
  }

  disable() {
    this._isActive = false;
  }

  validate() {
    if(this._id.length === 0) {
      throw new DomainValidationError('Invalid id');
    }
    if(this._sellerWalletId.length === 0) {
      throw new DomainValidationError('Invalid sellerWalletId');
    }
    if(this._tokenId.length === 0) {
      throw new DomainValidationError('Invalid tokenId');
    }
    if(this._amount < 0) {
      throw new DomainValidationError('Invalid amount');
    }
    if(this._unitPrice < 0) {
      throw new DomainValidationError('Invalid unitPrice');
    }
    if(this._currency.length === 0) {
      throw new DomainValidationError('Invalid currency');
    }
  }

  get id(): string {
    return this._id;
  }

  get sellerWalletId(): string {
    return this._sellerWalletId;
  }

  get tokenId(): string {
    return this._tokenId;
  }

  get amount(): number {
    return this._amount;
  }

  get unitPrice(): number {
    return this._unitPrice;
  }

  get currency(): string {
    return this._currency;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get expirationDate(): number {
    return this._expirationDate;
  }
}
