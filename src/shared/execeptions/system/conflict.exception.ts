import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(message: string, field?: string, value?: any) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message,
        errorCode: 'CONFLICT_ERROR',
        timestamp: new Date().toISOString(),
        context: field && value ? { field, value } : {},
      },
      HttpStatus.CONFLICT,
    );
  }
}
