import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    public readonly errorCode?: string,
    public readonly context?: any,
  ) {
    super(
      {
        message,
        statusCode,
        errorCode,
        timestamp: new Date().toISOString(),
        context,
      },
      statusCode,
    );
  }
}
