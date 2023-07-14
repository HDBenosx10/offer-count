import { User } from './user.entity';
import { DomainValidationError } from '../errors/domainValidation.error';

describe('User', () => {
  describe('constructor', () => {
    it('should create a valid instance', () => {
      const id = 'user-id';
      const username = 'john.doe';

      const userInstance = new User(id, username);

      expect(userInstance).toBeDefined();
      expect(userInstance.id).toBe(id);
      expect(userInstance.username).toBe(username);
    });
  });

  describe('validate', () => {
    it('should throw DomainValidationError when id is invalid', () => {
      const id = '';
      const username = 'john.doe';

      expect(() => new User(id, username)).toThrow(DomainValidationError);
    });

    it('should throw DomainValidationError when username is invalid', () => {
      const id = 'user-id';
      const username = '';

      expect(() => new User(id, username)).toThrow(DomainValidationError);
    });
  });

  describe('create', () => {
    it('should create a new instance with a generated id', () => {
      const username = 'john.doe';

      const userInstance = User.create(username);

      expect(userInstance).toBeDefined();
      expect(userInstance.id).toBeDefined();
      expect(userInstance.username).toBe(username);
    });
  });
});
