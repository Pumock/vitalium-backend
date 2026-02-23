import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DoctorModule } from './doctor.module';
import { MonitoringModule } from '../shared/monitoring/monitoring.module';
import { HealthController } from '../presentation/controllers/health.controller';
import { ExceptionsModule } from '../shared/execeptions/exceptions.module';
import { ConfigModule } from '@nestjs/config';
import { UnitModule } from './units.module';
import { DoctorUnitModule } from './doctor-unit.module';

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
  providers: [],
})
export class AppModule {}
