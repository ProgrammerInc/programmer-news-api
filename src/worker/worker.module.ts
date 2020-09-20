import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { configOptions } from '../config/config.options';
import { FeedModule } from '../feed/feed.module';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    PrismaModule,
    ArticleModule,
    FeedModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService, ArticleService],
})
export class WorkerModule {}
