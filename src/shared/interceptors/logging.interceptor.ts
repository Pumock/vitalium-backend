import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      body: unknown;
      headers: Record<string, string>;
    }>();
    const { method, url, body, headers } = request;
    const userAgent = headers['user-agent'] || 'Unknown';
    const startTime = Date.now();
    const contentType = headers['content-type'] || '';

    const isMultipart = contentType.includes('multipart/form-data');
    let bodyLog = '';

    if (isMultipart) {
      bodyLog = '[multipart/form-data]';
    } else if (body) {
      try {
        bodyLog = JSON.stringify(body);
      } catch {
        bodyLog = '[Unable to serialize body]';
      }
    }

    this.logger.log(
      `📥 ${method} ${url} | User-Agent: ${userAgent}${bodyLog ? ` | Body: ${bodyLog}` : ''}`,
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<{
            statusCode: number;
          }>();
          const { statusCode } = response;
          const responseTime = Date.now() - startTime;

          this.logger.log(
            `📤 ${method} ${url} | Status: ${statusCode} | Time: ${responseTime}ms`,
          );
        },
      }),
    );
  }
}
