import { forwardRef, Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => ArticleModule),
  ],
  providers: [FeedResolver, FeedService, ArticleService],
})
export class FeedModule {}
