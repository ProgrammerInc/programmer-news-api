import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { FeedModule } from '../feed/feed.module';
import { FeedService } from '../feed/feed.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URL || 'redis://localhost:6379',
        },
      },
    ]),
    PrismaModule,
    forwardRef(() => CategoryModule),
    forwardRef(() => FeedModule),
  ],
  providers: [ArticleResolver, ArticleService, CategoryService, FeedService],
})
export class ArticleModule {}
