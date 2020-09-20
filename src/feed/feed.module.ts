import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        }
      },
    ]),
    PrismaModule,
    forwardRef(() => ArticleModule),
  ],
  providers: [FeedResolver, FeedService, ArticleService],
})
export class FeedModule {}
