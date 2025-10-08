import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { MonitoringModule } from '../shared/monitoring/monitoring.module';
import { HealthController } from '../presentation/controllers/health.controller';
import { ExceptionsModule } from '../shared/execeptions/exceptions.module';

@Module({
  imports: [UserModule, ExceptionsModule, MonitoringModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
