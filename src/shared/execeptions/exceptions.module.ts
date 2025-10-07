import { Module, Global } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { ExceptionFactory } from './exception-factory';
import { MonitoringModule } from '../monitoring/monitoring.module';

@Global()
@Module({
  imports: [MonitoringModule],
  providers: [
    ExceptionFactory,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
  ],
  exports: [ExceptionFactory],
})
export class ExceptionsModule {}
