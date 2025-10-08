import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class HospitalNotFoundException extends ApplicationException {
  constructor(criteria?: string) {
    const message = `Nenhum hospital foi encontrado${
      criteria ? ` com os critérios: ${criteria}` : '.'
    }`;

    super(message, HttpStatus.NOT_FOUND, 'HOSPITAL_NOT_FOUND', { criteria });
  }
}
