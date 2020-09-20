import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { FeedModule } from './feed/feed.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        ENABLE_COMPRESSION: Joi.boolean().default(false),
        ENABLE_CORS: Joi.boolean().default(false),
        ENABLE_CSURF: Joi.boolean().default(false),
        ENABLE_HELMET: Joi.boolean().default(false),
        ENABLE_RATELIMIT: Joi.boolean().default(false),
        RATELIMIT_WINDOW: Joi.number().default(15),
        RATELIMIT_MAX: Joi.number().default(100),
        DATABASE_URL: Joi.string().default('postgresql://postgres@localhost:5432/programmer-news?schema=public'),
        REDIS_URL: Joi.string().default('redis://localhost:6379'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
    }),
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'docs'),
      serveRoot: "/docs",
      exclude: ['/graphql'],
    }),
    ArticleModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
