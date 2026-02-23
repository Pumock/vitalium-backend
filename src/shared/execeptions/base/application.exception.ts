import type { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export abstract class ApplicationException extends BaseException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    errorCode: string,
    context?: any,
  ) {
    super(message, statusCode, errorCode, context);
  }
}
