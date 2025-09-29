import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MetricsCollectorService } from './metrics-collector.service';
import * as os from 'os';
import * as process from 'process';

@Injectable()
export class SystemHealthService implements OnModuleInit, OnModuleDestroy {
  private healthCheckInterval: NodeJS.Timeout;
  private readonly HEALTH_CHECK_INTERVAL = 30 * 1000; // 30 seconds

  constructor(private readonly metricsCollector: MetricsCollectorService) {}

  onModuleInit() {
    this.startHealthChecks();
  }

  onModuleDestroy() {
    this.stopHealthChecks();
  }

  // Start periodic health checks
  private startHealthChecks() {
    this.healthCheckInterval = setInterval(async () => {
      await this.collectSystemMetrics();
    }, this.HEALTH_CHECK_INTERVAL);
  }

  // Stop periodic health checks
  private stopHealthChecks() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }

  // Collect and log system metrics
  async collectSystemMetrics() {
    try {
      const metrics = await this.getSystemMetrics();

      await this.metricsCollector.logSystemHealth(metrics);

      // Check for critical conditions
      await this.checkCriticalConditions(metrics);
    } catch (error) {
      console.error('Failed to collect system metrics:', error);
    }
  }

  // Get current system metrics
  async getSystemMetrics() {
    const cpuUsage = await this.getCpuUsage();
    const memoryUsage = this.getMemoryUsage();
    const diskUsage = await this.getDiskUsage();

    return {
      cpuUsage,
      memoryUsage: memoryUsage.percentage,
      diskUsage,
      responseTime: await this.measureResponseTime(),
      activeConnections: this.getActiveConnections(),
      errorRate: await this.calculateErrorRate(),
      metadata: {
        totalMemory: memoryUsage.total,
        freeMemory: memoryUsage.free,
        usedMemory: memoryUsage.used,
        uptime: process.uptime(),
        nodeVersion: process.version,
        platform: os.platform(),
        arch: os.arch(),
        loadAverage: os.loadavg(),
      },
    };
  }

  // Get CPU usage percentage
  private async getCpuUsage(): Promise<number> {
    return new Promise((resolve) => {
      const startMeasure = this.cpuAverage();

      setTimeout(() => {
        const endMeasure = this.cpuAverage();
        const idleDifference = endMeasure.idle - startMeasure.idle;
        const totalDifference = endMeasure.total - startMeasure.total;
        const cpuPercentage =
          100 - ~~((100 * idleDifference) / totalDifference);

        resolve(cpuPercentage);
      }, 100);
    });
  }

  // Helper function to calculate CPU average
  private cpuAverage() {
    const cpus = os.cpus();
    let user = 0;
    let nice = 0;
    let sys = 0;
    let idle = 0;
    let irq = 0;

    for (const cpu of cpus) {
      user += cpu.times.user;
      nice += cpu.times.nice;
      sys += cpu.times.sys;
      idle += cpu.times.idle;
      irq += cpu.times.irq;
    }

    const total = user + nice + sys + idle + irq;

    return {
      idle,
      total,
    };
  }

  // Get memory usage information
  private getMemoryUsage() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const percentage = (usedMemory / totalMemory) * 100;

    return {
      total: totalMemory,
      free: freeMemory,
      used: usedMemory,
      percentage: Math.round(percentage * 100) / 100,
    };
  }

  // Get disk usage (simplified - would need additional libraries for full disk stats)
  private async getDiskUsage(): Promise<number> {
    try {
      // This is a simplified implementation
      // In production, you might want to use libraries like 'node-disk-usage'
      return 0; // Placeholder
    } catch (error) {
      console.warn('Could not retrieve disk usage:', error.message);
      return 0;
    }
  }

  // Measure application response time
  private async measureResponseTime(): Promise<number> {
    const start = process.hrtime();

    // Simulate a small operation to measure responsiveness
    await new Promise((resolve) => setTimeout(resolve, 1));

    const [seconds, nanoseconds] = process.hrtime(start);
    return seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
  }

  // Get active connections count (simplified)
  private getActiveConnections(): number {
    // This would typically involve checking actual connection pools
    // For now, return a placeholder value
    return 0;
  }

  // Calculate error rate from recent logs
  private async calculateErrorRate(): Promise<number> {
    try {
      // This would need to be implemented based on your error tracking
      // For now, return a placeholder value
      return 0;
    } catch (error) {
      console.warn('Could not calculate error rate:', error.message);
      return 0;
    }
  }

  // Check for critical system conditions
  private async checkCriticalConditions(metrics: any) {
    const alerts = [];

    // CPU usage alerts
    if (metrics.cpuUsage > 90) {
      alerts.push({
        type: 'CPU_CRITICAL',
        message: `CPU usage is critically high: ${metrics.cpuUsage}%`,
        severity: 'CRITICAL',
      });
    } else if (metrics.cpuUsage > 75) {
      alerts.push({
        type: 'CPU_HIGH',
        message: `CPU usage is high: ${metrics.cpuUsage}%`,
        severity: 'HIGH',
      });
    }

    // Memory usage alerts
    if (metrics.memoryUsage > 90) {
      alerts.push({
        type: 'MEMORY_CRITICAL',
        message: `Memory usage is critically high: ${metrics.memoryUsage}%`,
        severity: 'CRITICAL',
      });
    } else if (metrics.memoryUsage > 80) {
      alerts.push({
        type: 'MEMORY_HIGH',
        message: `Memory usage is high: ${metrics.memoryUsage}%`,
        severity: 'HIGH',
      });
    }

    // Response time alerts
    if (metrics.responseTime > 1000) {
      alerts.push({
        type: 'RESPONSE_TIME_SLOW',
        message: `Response time is slow: ${metrics.responseTime}ms`,
        severity: 'HIGH',
      });
    }

    // Log alerts
    for (const alert of alerts) {
      await this.metricsCollector.logSecurityEvent({
        event: alert.type,
        severity: alert.severity as any,
        description: alert.message,
        metadata: metrics,
      });

      console.warn('Health Alert:', alert.message);
    }
  }

  // Get health status summary
  async getHealthStatus() {
    try {
      const metrics = await this.getSystemMetrics();

      // Determine overall health status
      let status = 'healthy';
      const warnings = [];

      if (metrics.cpuUsage > 90 || metrics.memoryUsage > 90) {
        status = 'critical';
      } else if (metrics.cpuUsage > 75 || metrics.memoryUsage > 80) {
        status = 'warning';
        if (metrics.cpuUsage > 75) warnings.push('High CPU usage');
        if (metrics.memoryUsage > 80) warnings.push('High memory usage');
      }

      return {
        status,
        timestamp: new Date(),
        metrics,
        warnings,
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
      };
    } catch (error) {
      console.error('Failed to get health status:', error);

      return {
        status: 'error',
        timestamp: new Date(),
        error: error.message,
      };
    }
  }

  // Force a health check
  async performHealthCheck() {
    await this.collectSystemMetrics();
    return this.getHealthStatus();
  }
}
