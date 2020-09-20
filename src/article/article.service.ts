import { Injectable } from '@nestjs/common';
import {
  Article,
  ArticleCreateInput,
  ArticleOrderByInput,
  ArticleUpdateInput,
  ArticleWhereInput,
  ArticleWhereUniqueInput,
  Feed,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}

  async article(
    articleWhereUniqueInput: ArticleWhereUniqueInput,
  ): Promise<Article | null> {
    return this.prismaService.article.findOne({
      where: articleWhereUniqueInput,
    });
  }

  async articles(params: {
    skip?: number;
    take?: number;
    cursor?: ArticleWhereUniqueInput;
    where?: ArticleWhereInput;
    orderBy?: ArticleOrderByInput;
  }): Promise<Article[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.article.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createArticle(data: ArticleCreateInput): Promise<Article> {
    return this.prismaService.article.create({
      data,
    });
  }

  async updateArticle(params: {
    where: ArticleWhereUniqueInput;
    data: ArticleUpdateInput;
  }): Promise<Article> {
    const { data, where } = params;
    return this.prismaService.article.update({
      data,
      where,
    });
  }

  async deleteArticle(where: ArticleWhereUniqueInput): Promise<Article> {
    return this.prismaService.article.delete({
      where,
    });
  }

  async feed(
    articleWhereUniqueInput: ArticleWhereUniqueInput,
  ): Promise<Feed | null> {
    return this.prismaService.article
      .findOne({
        where: articleWhereUniqueInput,
      })
      .feed();
  }
}
