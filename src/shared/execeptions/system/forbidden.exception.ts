import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class ForbiddenException extends ApplicationException {
  constructor(resource?: string) {
    super(
      `Acesso proibido${resource ? ` ao recurso: ${resource}` : ''}`,
      HttpStatus.FORBIDDEN,
      'FORBIDDEN',
      { resource },
    );
  }
}
