import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class ClinicNotFoundException extends ApplicationException {
  constructor(criteria?: string) {
    const message = `Nenhuma clínica foi encontrada${
      criteria ? ` com os critérios: ${criteria}` : '.'
    }`;

    super(message, HttpStatus.NOT_FOUND, 'CLINIC_NOT_FOUND', { criteria });
  }
}
