import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class DoctorAlreadyExistsException extends ApplicationException {
  constructor(crm: string) {
    super(
      `Médico com CRM ${crm} já está cadastrada no sistema`,
      HttpStatus.CONFLICT,
      'DOCTOR_ALREADY_EXISTS',
      { crm },
    );
  }
}
