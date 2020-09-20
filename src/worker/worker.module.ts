import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '../config/config.options';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [ConfigModule.forRoot(configOptions), PrismaModule],
  controllers: [WorkerController],
  providers: [WorkerService, PrismaService],
})
export class WorkerModule {}
