import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../infrastructure/database/prisma.provider';
import { LogLevel, SecurityLevel } from '@prisma/client';

@Injectable()
export class MetricsCollectorService {
  constructor(private readonly prisma: PrismaProvider) {}

  // Log API request metrics
  async logApiRequest(data: {
    method: string;
    url: string;
    statusCode: number;
    duration: number;
    ip?: string;
    userAgent?: string;
    userId?: string;
  }) {
    try {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await this.prisma.requestLog.create({
        data: {
          method: data.method,
          url: data.url,
          statusCode: data.statusCode,
          duration: data.duration,
          ip: data.ip,
          userAgent: data.userAgent,
          userId: data.userId,
          requestId: requestId,
        },
      });

      await this.updateApiUsageStats(data.url, data.method, data.duration);
      console.log(
        `API Request logged: ${data.method} ${data.url} - ${data.statusCode} (${data.duration}ms)`,
      );
    } catch (error) {
      console.error('Failed to log API request:', error);
    }
  }

  // Update API usage statistics
  private async updateApiUsageStats(
    endpoint: string,
    method: string,
    duration: number,
  ) {
    try {
      const today = new Date();
      const currentHour = today.getHours();
      today.setHours(0, 0, 0, 0);

      await this.prisma.apiUsageStatistic.upsert({
        where: {
          endpoint_method_date_hour: {
            endpoint,
            method,
            date: today,
            hour: currentHour,
          },
        },
        create: {
          endpoint,
          method,
          date: today,
          hour: currentHour,
          count: 1,
          avgDuration: duration,
          minDuration: duration,
          maxDuration: duration,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error('Failed to update API usage stats:', error);
    }
  }

  // Log security events
  async logSecurityEvent(data: {
    event: string;
    severity?: SecurityLevel;
    userId?: string;
    ip?: string;
    userAgent?: string;
    description?: string;
    metadata?: any;
  }) {
    try {
      await this.prisma.securityLog.create({
        data: {
          event: data.event,
          severity: data.severity || SecurityLevel.MEDIUM,
          description: data.description,
          userId: data.userId,
          ip: data.ip,
          userAgent: data.userAgent,
          metadata: data.metadata,
        },
      });
      console.log(`Security event logged: ${data.event} - ${data.severity}`);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  // Log performance metrics
  async logPerformanceMetric(data: {
    operation: string;
    duration: number;
    metadata?: any;
  }) {
    try {
      await this.prisma.performanceMetric.create({
        data: {
          operation: data.operation,
          duration: data.duration,
          metadata: data.metadata,
        },
      });
      console.log(
        `Performance metric logged: ${data.operation} - ${data.duration}ms`,
      );
    } catch (error) {
      console.error('Failed to log performance metric:', error);
    }
  }

  // Log system health metrics
  async logSystemHealth(data: {
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    responseTime?: number;
    activeConnections?: number;
    errorRate?: number;
    metadata?: any;
  }) {
    try {
      await this.prisma.systemHealthMetric.create({
        data: {
          cpuUsage: data.cpuUsage,
          memoryUsage: data.memoryUsage,
          diskUsage: data.diskUsage,
          responseTime: data.responseTime,
          activeConnections: data.activeConnections,
          errorRate: data.errorRate,
          metadata: data.metadata,
        },
      });
      console.log('System health metric logged');
    } catch (error) {
      console.error('Failed to log system health:', error);
    }
  }

  // Log business events
  async logBusinessEvent(data: {
    event: string;
    entity: string;
    entityId: string;
    userId?: string;
    metadata?: any;
  }) {
    try {
      await this.prisma.businessEventLog.create({
        data: {
          event: data.event,
          entity: data.entity,
          entityId: data.entityId,
          userId: data.userId,
          metadata: data.metadata,
        },
      });
      console.log(
        `Business event logged: ${data.event} for ${data.entity}:${data.entityId}`,
      );
    } catch (error) {
      console.error('Failed to log business event:', error);
    }
  }

  // Log application errors
  async logError(data: {
    errorType: string;
    errorMessage: string;
    stackTrace?: string;
    userId?: string;
    context?: string;
    metadata?: any;
  }) {
    try {
      await this.prisma.errorLog.create({
        data: {
          errorType: data.errorType,
          errorMessage: data.errorMessage,
          stackTrace: data.stackTrace,
          userId: data.userId,
          context: data.context,
          metadata: data.metadata,
        },
      });
      console.error(`Error logged: ${data.errorType} - ${data.errorMessage}`);
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  }

  // Log application events
  async logApplication(data: {
    level: LogLevel;
    message: string;
    context?: string;
    trace?: string;
    meta?: any;
    userId?: string;
    sessionId?: string;
    requestId?: string;
  }) {
    try {
      await this.prisma.applicationLog.create({
        data: {
          level: data.level,
          message: data.message,
          context: data.context,
          trace: data.trace,
          meta: data.meta,
          userId: data.userId,
          sessionId: data.sessionId,
          requestId: data.requestId,
        },
      });
      console.log(`Application log: [${data.level}] ${data.message}`);
    } catch (error) {
      console.error('Failed to log application event:', error);
    }
  }

  // Log database operations
  async logDatabaseOperation(data: {
    operation: string;
    table: string;
    duration: number;
    queryType?: string;
    userId?: string;
    metadata?: any;
  }) {
    try {
      await this.prisma.databaseLog.create({
        data: {
          operation: data.operation,
          table: data.table,
          duration: data.duration,
          queryType: data.queryType,
          userId: data.userId,
          metadata: data.metadata,
        },
      });
      console.log(
        `Database operation logged: ${data.operation} on ${data.table} - ${data.duration}ms`,
      );
    } catch (error) {
      console.error('Failed to log database operation:', error);
    }
  }
}
