import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../base/base.exception';
import { SystemHealthService } from '../../monitoring/system-health.service';
import { MetricsCollectorService } from '../../monitoring/metrics-collector.service';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(
    private readonly systemHealth: SystemHealthService,
    private readonly metricsCollector: MetricsCollectorService,
  ) { }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
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

    // Monitoramento automático de erros críticos
    await this.logErrorToMonitoringSystem(exception, {
      status,
      message,
      errorCode,
      request,
      errorResponse,
    });

    response.status(status).json(errorResponse);
  }

  private async logErrorToMonitoringSystem(
    exception: unknown,
    errorData: {
      status: number;
      message: string;
      errorCode: string;
      request: Request;
      errorResponse: any;
    },
  ): Promise<void> {
    try {
      const { status, message, errorCode, request } = errorData;

      // Determinar se é um erro crítico (5xx) ou aplicação
      const isCritical = status >= 500;
      const isAuthError = status === 401 || status === 403;
      const isDatabaseError =
        exception instanceof Error &&
        (exception.message.includes('database') ||
          exception.message.includes('prisma') ||
          exception.message.includes('connection'));

      // Log erro crítico
      if (isCritical) {
        await this.systemHealth.logCriticalError({
          type: errorCode,
          message: `HTTP ${status}: ${message}`,
          stackTrace: exception instanceof Error ? exception.stack : undefined,
          context: JSON.stringify({
            url: request.url,
            method: request.method,
            ip: request.ip,
            userAgent: request.get('User-Agent'),
            statusCode: status,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      // Log falha de aplicação para erros 4xx que não são de autenticação
      if (status >= 400 && status < 500 && !isAuthError) {
        await this.systemHealth.logApplicationFailure({
          operation: `${request.method} ${request.url}`,
          error: message,
          metadata: {
            statusCode: status,
            errorCode,
            ip: request.ip,
            userAgent: request.get('User-Agent'),
          },
        });
      }

      // Log falha de banco de dados
      if (isDatabaseError) {
        await this.systemHealth.logDatabaseFailure({
          operation: `${request.method} ${request.url}`,
          error: message,
          metadata: {
            statusCode: status,
            errorCode,
            stackTrace:
              exception instanceof Error ? exception.stack : undefined,
          },
        });
      }

      // Log falha de autenticação
      if (isAuthError) {
        await this.systemHealth.logAuthFailure({
          type: errorCode,
          userId: 'unknown', // Poderia ser obtido do request se disponível
          ip: request.ip,
          userAgent: request.get('User-Agent'),
          metadata: {
            statusCode: status,
            url: request.url,
            method: request.method,
          },
        });
      }

      // Sempre log o erro geral
      await this.metricsCollector.logError({
        errorType: errorCode,
        errorMessage: message,
        stackTrace: exception instanceof Error ? exception.stack : undefined,
        context: `${request.method} ${request.url}`,
        userId: undefined, // Não definir userId se não temos um usuário real
      });
    } catch (monitoringError) {
      // Não falhar a requisição se o monitoramento falhar
      this.logger.error(
        'Erro ao registrar no sistema de monitoramento:',
        monitoringError,
      );
    }
  }
}
