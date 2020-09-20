import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Feed } from '../feed/models/feed.model';
import { ArticleService } from './article.service';
import { ArticleInput } from './inputs/article.input';
import { Article } from './models/article.model';

@Resolver((_of) => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query((_returns) => [Article])
  async getArticles(): Promise<Article[]> {
    return this.articleService.articles({ where: { published: true } });
  }

  @Query((_returns) => Article)
  async getArticleById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Article> {
    return this.articleService.article({ id });
  }

  @Mutation((_returns) => Article)
  async createArticle(
    @Args({ name: 'article', type: () => ArticleInput }) article: ArticleInput,
  ): Promise<Article> {
    return this.articleService.createArticle(article);
  }

  @Mutation((_returns) => Article)
  async updateArticle(
    @Args('id', { type: () => Int }) id: number,
    @Args({ name: 'article', type: () => ArticleInput }) article: ArticleInput,
  ): Promise<Article> {
    return this.articleService.updateArticle({ where: { id }, data: article });
  }

  @Mutation((_returns) => Article)
  async deleteArticle(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Article> {
    return this.articleService.deleteArticle({ id });
  }

  @ResolveField()
  async feed(@Parent() article: Article): Promise<Feed> {
    const { id } = article;

    return this.articleService.feed({ id });
  }
}
