import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class HospitalNotFoundException extends ApplicationException {
  constructor(criteria?: string) {
    const message = `Nenhuma Unidade foi encontrado${criteria ? ` com os critérios: ${criteria}` : '.'
      }`;

    super(message, HttpStatus.NOT_FOUND, 'UNIT_NOT_FOUND', { criteria });
  }
}
