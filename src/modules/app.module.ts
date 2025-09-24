import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/shared/execeptions/filters/global-exception.filter';
import { UserModule } from './user.module';
import { ExceptionsModule } from 'src/shared/execeptions/exceptions.module';

@Module({
  imports: [UserModule, ExceptionsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
