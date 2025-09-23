import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export abstract class DomainException extends BaseException {
  constructor(message: string, errorCode: string, context?: any) {
    super(message, HttpStatus.BAD_REQUEST, errorCode, context);
  }
}
