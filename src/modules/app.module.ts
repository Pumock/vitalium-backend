import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user.module';
import { DoctorModule } from './doctor.module';
import { MonitoringModule } from '../shared/monitoring/monitoring.module';
import { HealthController } from '../presentation/controllers/health.controller';
import { ExceptionsModule } from '../shared/execeptions/exceptions.module';
import { ConfigModule } from '@nestjs/config';
import { UnitModule } from './units.module';
import { DoctorUnitModule } from './doctor-unit.module';
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    UserModule,
    DoctorModule,
    DoctorUnitModule,
    UnitModule,
    ExceptionsModule,
    MonitoringModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
