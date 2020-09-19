import { forwardRef, Module } from '@nestjs/common';
import { FeedModule } from '../feed/feed.module';
import { FeedService } from '../feed/feed.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => FeedModule),
  ],
  providers: [ArticleResolver, ArticleService, FeedService],
})
export class ArticleModule {}
