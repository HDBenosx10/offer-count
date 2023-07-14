import { DomainValidationError } from '../errors/domainValidation.error';
import crypto from 'crypto';

export class Tokens {
  private _id: string;
  private _name: string;
  private _symbol: number;
  private _precision: string;

  constructor(id: string, name: string, symbol: number, precision: string) {
    this._id = id;
    this._name = name;
    this._symbol = symbol;
    this._precision = precision;
    this.validate();
  }

  static create(name: string, symbol: number, precision: string) {
    const id = crypto.randomUUID();
    return new Tokens(id, name, symbol, precision);
  }

  validate() {
    if(this._id.length === 0) {
      throw new DomainValidationError('Invalid id');
    }
    if(this._name.length === 0) {
      throw new DomainValidationError('Invalid name');
    }
    if(!Number(this._symbol)) {
      throw new DomainValidationError('Invalid symbol');
    }
    if(this._precision.length === 0) {
      throw new DomainValidationError('Invalid precision');
    }
  }

  get id(): string {
    return this._id;
  }

  get symbol(): number {
    return this._symbol;
  }

  get name(): string {
    return this._name;
  }

  get precision(): string {
    return this._precision;
  }

}
