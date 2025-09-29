import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class UnauthorizedException extends ApplicationException {
  constructor(action?: string) {
    super(
      `Acesso não autorizado${action ? ` para a ação: ${action}` : ''}`,
      HttpStatus.UNAUTHORIZED,
      'UNAUTHORIZED',
      { action },
    );
  }
}
