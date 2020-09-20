import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

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
    forwardRef(() => ArticleModule),
  ],
  providers: [CategoryResolver, CategoryService, ArticleService],
})
export class CategoryModule {}
