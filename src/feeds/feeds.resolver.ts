import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { FeedInput } from './inputs/feed.input';
import { Feed } from './models/feed.model';

@Resolver(_of => Feed)
export class FeedsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(_returns => [Feed])
  async getFeeds(): Promise<Feed[]> {
    return this.prismaService.feed.findMany();
  }

  @Query(_returns => Feed)
  async getFeedById(@Args('id', { type: () => Int }) id: number): Promise<Feed> {
    return this.prismaService.feed.findOne({ where: { id } });
  }

  @Mutation(_returns => Feed)
  async createFeed(@Args({ name: 'feed', type: () => FeedInput }) feed: FeedInput): Promise<Feed> {
    return this.prismaService.feed.create({
      data: { ...feed },
    });
  }
}
