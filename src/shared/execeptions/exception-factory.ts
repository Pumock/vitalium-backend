import { UserNotFoundException } from './user/user-not-found.exception';

export class ExceptionFactory {
  static userNotFound(criteria?: string): UserNotFoundException {
    return new UserNotFoundException(criteria);
  }
}
