import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export interface FieldError {
  field: string;
  value: any;
  constraints: string[];
}

export class ValidationException extends ApplicationException {
  constructor(errors: FieldError[]) {
    const message = `Erro de validação nos campos: ${errors
      .map((e) => e.field)
      .join(', ')}`;

    super(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR', { errors });
  }
}
