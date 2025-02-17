import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Database connection closed');
  }
}
