import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleInput } from './inputs/article.input';
import { Article } from './models/article.model';

@Resolver(_of => Article)
export class ArticlesResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(_returns => [Article])
  async getArticles() {
    return this.prismaService.article.findMany();
  }

  @Query(_returns => Article)
  async getArticleById(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.article.findOne({ where: { id } });
  }

  @Mutation(_returns => Article)
  async createFeed(@Args({ name: 'article', type: () => ArticleInput }) article: ArticleInput) {
    return this.prismaService.article.create({
      data: { ...article },
    });
  }
}
