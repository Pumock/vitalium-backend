import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class DoctorNotFoundException extends ApplicationException {
  constructor(criteria?: string) {
    const message = `Nenhum médico foi encontrado${
      criteria ? ` com os critérios: ${criteria}` : '.'
    }`;

    super(message, HttpStatus.NOT_FOUND, 'DOCTOR_NOT_FOUND', { criteria });
  }
}
