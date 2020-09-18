import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ArticlesResolver } from './articles.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ArticlesResolver]
})
export class ArticlesModule {}
