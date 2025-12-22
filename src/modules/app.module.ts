import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DoctorModule } from './doctor.module';
import { OrganizationModule } from './organization.module';
import { MonitoringModule } from '../shared/monitoring/monitoring.module';
import { HealthController } from '../presentation/controllers/health.controller';
import { ExceptionsModule } from '../shared/execeptions/exceptions.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    UserModule,
    DoctorModule,
    OrganizationModule,
    ExceptionsModule,
    MonitoringModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
