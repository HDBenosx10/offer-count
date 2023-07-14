import { DomainValidationError } from '../errors/domainValidation.error';
import crypto from 'crypto';

export class Wallet {
  private _id: string;
  private _userId: string;
  private _code: number;
  private _alias: string;

  constructor(id: string, userId: string, code: number, alias: string) {
    this._id = id;
    this._userId = userId;
    this._code = code;
    this._alias = alias;
    this.validate();
  }

  static create(userId: string, code: number, alias: string) {
    const id = crypto.randomUUID();
    return new Wallet(id, userId, code, alias);
  }

  validate() {
    if(this._id.length === 0) {
      throw new DomainValidationError('Invalid id');
    }
    if(this._userId.length === 0) {
      throw new DomainValidationError('Invalid userId');
    }
    if(!Number(this._code)) {
      throw new DomainValidationError('Invalid code');
    }
    if(this._alias.length === 0) {
      throw new DomainValidationError('Invalid alias');
    }
  }

  get id(): string {
    return this._id;
  }

  get code(): number {
    return this._code;
  }

  get userId(): string {
    return this._userId;
  }

  get alias(): string {
    return this._alias;
  }

}
