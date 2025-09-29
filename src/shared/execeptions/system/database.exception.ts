import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class DatabaseException extends ApplicationException {
  constructor(operation: string, error: any) {
    super(
      `Erro na operação de banco de dados: ${operation}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'DATABASE_ERROR',
      { operation, originalError: error.message },
    );
  }
}
