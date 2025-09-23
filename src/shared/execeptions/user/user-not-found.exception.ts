import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class UserNotFoundException extends ApplicationException {
  constructor(criteria?: string) {
    const message = `Nenhum usuário foi encontrado${
      criteria ? ` com os critérios: ${criteria}` : '.'
    }`;

    super(message, HttpStatus.NOT_FOUND, 'USER_NOT_FOUND', { criteria });
  }
}
