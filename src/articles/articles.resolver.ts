/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from './models/article.model';

@Resolver(of => Article)
export class ArticlesResolver {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  @Query(returns => Article)
  async article(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.article.findOne({ where: { id }});
  }

  @Query(returns => [Article])
  async articles() {
    return this.prismaService.article.findMany();
  }
}