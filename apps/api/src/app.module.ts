import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';

import { AppController } from './app.controller';
import { EventsGateway } from './events.gateway';
import { PrismaService } from './prisma.service';
import { StorageService } from './storage.service';
import { AiService } from './ai.service';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, EventsGateway, StorageService, AiService],
})
export class AppModule {}
