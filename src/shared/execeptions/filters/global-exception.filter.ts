import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../base/base.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let context: any = null;

    if (exception instanceof BaseException) {
      // Nossa exceção customizada
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      message = exceptionResponse.message;
      errorCode = exceptionResponse.errorCode;
      context = exceptionResponse.context;
    } else if (exception instanceof HttpException) {
      // Exceção HTTP padrão do NestJS
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
    } else if (exception instanceof Error) {
      // Erro genérico do JavaScript
      message = exception.message;
      this.logger.error(
        `Unexpected error: ${exception.message}`,
        exception.stack,
      );
    }

    const errorResponse = {
      statusCode: status,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(context && { context }),
    };

    // Log do erro
    this.logger.error(
      `HTTP ${status} Error: ${message}`,
      JSON.stringify({
        ...errorResponse,
        userAgent: request.get('User-Agent'),
        ip: request.ip,
      }),
    );

    response.status(status).json(errorResponse);
  }
}
