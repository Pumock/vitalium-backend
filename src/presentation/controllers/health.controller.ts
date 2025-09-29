import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemHealthService } from '../../shared/monitoring/system-health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly systemHealthService: SystemHealthService) {}

  @Get()
  @ApiOperation({ summary: 'Get system health status' })
  @ApiResponse({
    status: 200,
    description: 'System health status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['healthy', 'warning', 'critical', 'error'],
          description: 'Overall system health status',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'Timestamp of the health check',
        },
        metrics: {
          type: 'object',
          properties: {
            cpuUsage: {
              type: 'number',
              description: 'CPU usage percentage',
            },
            memoryUsage: {
              type: 'number',
              description: 'Memory usage percentage',
            },
            diskUsage: {
              type: 'number',
              description: 'Disk usage percentage',
            },
            responseTime: {
              type: 'number',
              description: 'Response time in milliseconds',
            },
            activeConnections: {
              type: 'number',
              description: 'Number of active connections',
            },
            errorRate: {
              type: 'number',
              description: 'Error rate percentage',
            },
          },
        },
        warnings: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of current warnings',
        },
        version: {
          type: 'string',
          description: 'Application version',
        },
        environment: {
          type: 'string',
          description: 'Current environment',
        },
        uptime: {
          type: 'number',
          description: 'Application uptime in seconds',
        },
      },
    },
  })
  async getHealth() {
    return this.systemHealthService.getHealthStatus();
  }

  @Get('check')
  @ApiOperation({ summary: 'Perform immediate health check' })
  @ApiResponse({
    status: 200,
    description: 'Health check performed successfully',
  })
  async performHealthCheck() {
    return this.systemHealthService.performHealthCheck();
  }
}
