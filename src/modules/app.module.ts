import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ExceptionsModule } from 'src/shared/execeptions/exceptions.module';
import { MonitoringModule } from '../shared/monitoring/monitoring.module';
import { HealthController } from '../presentation/controllers/health.controller';

@Module({
  imports: [UserModule, ExceptionsModule, MonitoringModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
