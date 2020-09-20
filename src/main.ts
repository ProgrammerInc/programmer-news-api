import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as dotenv from 'dotenv';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  const enableCompression = configService.get<boolean>('ENABLE_COMPRESSION');

  if (enableCompression) {
    app.use(compression());
  }

  const enableCors = configService.get<boolean>('ENABLE_CORS');

  if (enableCors) {
    app.enableCors();
  }

  const enableCsurf = configService.get<boolean>('ENABLE_CSURF');

  if (enableCsurf) {
    app.use(csurf());
  }

  const enableHelmet = configService.get<boolean>('ENABLE_HELMET');

  if (enableHelmet) {
    app.use(helmet());
  }

  const enableRateLimit = configService.get<boolean>('ENABLE_RATELIMIT');

  if (enableRateLimit) {
    app.use(
      rateLimit({
        windowMs: configService.get<number>('RATELIMIT_WINDOW') * 60 * 1000,
        max: configService.get<number>('RATELIMIT_MAX'),
      }),
    );
  }

  await app.listen(port);
}
bootstrap();
