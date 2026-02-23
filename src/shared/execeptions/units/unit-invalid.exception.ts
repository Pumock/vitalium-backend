import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class UnitInvalidException extends ApplicationException {
  constructor(reason?: string) {
    super('Unidade inválida', HttpStatus.BAD_REQUEST, 'UNIT_INVALID', {
      reason,
    });
  }
}
