import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from './models/article.model';

@Resolver(_of => Article)
export class ArticlesResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(_returns => Article)
  async article(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.article.findOne({ where: { id } });
  }

  @Query(_returns => [Article])
  async articles() {
    return this.prismaService.article.findMany();
  }
}
