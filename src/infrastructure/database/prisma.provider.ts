import {
  Injectable,
  Logger,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('Prisma');

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);

    const isProduction = process.env.NODE_ENV === 'production';

    super({
      adapter,
      log: isProduction
        ? [
            { level: 'warn', emit: 'event' },
            { level: 'error', emit: 'event' },
          ]
        : [
            { level: 'query', emit: 'event' },
            { level: 'info', emit: 'event' },
            { level: 'warn', emit: 'event' },
            { level: 'error', emit: 'event' },
          ],
    });

    this.setupLogging();
  }

  private setupLogging() {
    const SLOW_QUERY_THRESHOLD = 100; // ms

    (this as any).$on('query', (e: any) => {
      const duration = e.duration ?? 0;
      const model = this.extractModel(e.query);
      const operation = this.extractOperation(e.query);

      if (duration > SLOW_QUERY_THRESHOLD) {
        this.logger.warn(`🐢 ${operation} ${model} | ${duration.toFixed(0)}ms`);
      } else {
        this.logger.log(`🔍 ${operation} ${model} | ${duration.toFixed(0)}ms`);
      }
    });

    (this as any).$on('warn', (e: any) => {
      this.logger.warn(`⚠️  ${e.message}`);
    });

    (this as any).$on('error', (e: any) => {
      this.logger.error(`❌ ${e.message}`);
    });
  }

  private extractModel(query: string): string {
    const patterns = [
      /"public"\."(\w+)"/i,
      /FROM\s+"?(\w+)"?/i,
      /INTO\s+"?(\w+)"?/i,
      /UPDATE\s+"?(\w+)"?/i,
      /DELETE\s+FROM\s+"?(\w+)"?/i,
    ];

    for (const pattern of patterns) {
      const match = query.match(pattern);
      if (match) return match[1];
    }

    return 'Unknown';
  }

  private extractOperation(query: string): string {
    const trimmed = query.trimStart().toUpperCase();
    if (trimmed.startsWith('SELECT')) return 'SELECT';
    if (trimmed.startsWith('INSERT')) return 'INSERT';
    if (trimmed.startsWith('UPDATE')) return 'UPDATE';
    if (trimmed.startsWith('DELETE')) return 'DELETE';
    return 'QUERY';
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Database disconnected');
  }
}
