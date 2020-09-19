import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/models/article.model';
import { FeedService } from './feed.service';
import { FeedInput } from './inputs/feed.input';
import { Feed } from './models/feed.model';

@Resolver(_of => Feed)
export class FeedResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly feedService: FeedService,
  ) {}

  @Query(_returns => [Feed])
  async getFeeds(): Promise<Feed[]> {
    return this.feedService.feeds({ where: { published: true }});
  }

  @Query(_returns => Feed)
  async getFeedById(@Args('id', { type: () => Int }) id: number): Promise<Feed> {
    return this.feedService.feed({ id });
  }

  @Mutation(_returns => Feed)
  async createFeed(@Args({ name: 'feed', type: () => FeedInput }) feed: FeedInput): Promise<Feed> {
    return this.feedService.createFeed(feed);
  }

  @ResolveField()
  async articles(@Parent() feed: Feed): Promise<Article[]> {
    const { id } = feed;

    return this.articleService.articles({ where: { feedId: id }});
  }
}
