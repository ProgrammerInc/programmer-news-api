import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Article,
  Feed,
  FeedCreateInput,
  FeedOrderByInput,
  FeedUpdateInput,
  FeedWhereInput,
  FeedWhereUniqueInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(
    @Inject('NEWS_FEED_WORKER') private workerClient: ClientProxy,
    private prismaService: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    await this.workerClient.connect();
  }

  async feed(userWhereUniqueInput: FeedWhereUniqueInput): Promise<Feed | null> {
    return this.prismaService.feed.findOne({
      where: userWhereUniqueInput,
    });
  }

  async feeds(params: {
    skip?: number;
    take?: number;
    cursor?: FeedWhereUniqueInput;
    where?: FeedWhereInput;
    orderBy?: FeedOrderByInput;
  }): Promise<Feed[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.feed.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createFeed(data: FeedCreateInput): Promise<Feed> {
    const feed = await this.prismaService.feed.create({
      data,
    });

    this.workerClient.emit<number>('feed_created', feed);

    return feed;
  }

  async updateFeed(params: {
    where: FeedWhereUniqueInput;
    data: FeedUpdateInput;
  }): Promise<Feed> {
    const { where, data } = params;
    return this.prismaService.feed.update({
      data,
      where,
    });
  }

  async deleteFeed(where: FeedWhereUniqueInput): Promise<Feed> {
    return this.prismaService.feed.delete({
      where,
    });
  }

  async articles(
    userWhereUniqueInput: FeedWhereUniqueInput,
  ): Promise<Article[] | null> {
    return this.prismaService.feed
      .findOne({
        where: userWhereUniqueInput,
      })
      .articles();
  }
}
