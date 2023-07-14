import { DomainValidationError } from '../errors/domainValidation.error';
import crypto from 'crypto';

export class User {
  private _id: string;
  private _username: string;

  constructor(id: string, username: string) {
    this._id = id;
    this._username = username;
    this.validate();
  }

  static create(username: string) {
    const id = crypto.randomUUID();
    return new User(id, username);
  }

  validate() {
    if(this._id.length === 0) {
      throw new DomainValidationError('Invalid id');
    }
    if(this._username.length === 0) {
      throw new DomainValidationError('Invalid username');
    }
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }
}
