import { Module } from '@nestjs/common';
import { MetricsCollectorService } from './metrics-collector.service';
import { SystemHealthService } from './system-health.service';
import { PrismaModule } from '../../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MetricsCollectorService, SystemHealthService],
  exports: [MetricsCollectorService, SystemHealthService],
})
export class MonitoringModule {}
