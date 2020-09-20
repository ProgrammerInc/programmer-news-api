import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { configOptions } from './config/config.options';
import { graphqlOptions } from './config/graphql.options';
import { staticOptions } from './config/static.options';
import { FeedModule } from './feed/feed.module';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    GraphQLModule.forRoot(graphqlOptions),
    HealthModule,
    PrismaModule,
    ServeStaticModule.forRoot(staticOptions),
    TerminusModule,
    ArticleModule,
    FeedModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
