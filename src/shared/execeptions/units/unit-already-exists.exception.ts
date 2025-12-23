import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class UnitAlreadyExistsException extends ApplicationException {
  constructor(cnpj: string) {
    super(
      `Unidade com CNPJ ${cnpj} já está cadastrada no sistema`,
      HttpStatus.CONFLICT,
      'UNIT_ALREADY_EXISTS',
      { cnpj },
    );
  }
}
