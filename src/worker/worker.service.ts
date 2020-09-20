import { Injectable, Logger } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Feed } from '../feed/models/feed.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkerService {
  constructor(private prismaService: PrismaService) {}

  private readonly logger = new Logger(WorkerService.name);

  async feedCreated(data: Feed) {
    const parser = new Parser();

    const { id, link } = data;
    const feed = await parser.parseURL(link);

    this.logger.log(feed);

    await this.prismaService.feed.update({
      where: { id },
      data: {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        feedUrl: feed.feedUrl,
      },
    });

    feed.items.forEach(async (item) => {
      this.logger.log(item);

      await this.prismaService.article.create({
        data: {
          title: item.title,
          author: item.author,
          link: item.link,
          guid: item.id,
          publishedAt: item.pubDate,
          feed: { connect: { id } },
        },
      });
    });
  }

  async updateFeeds(data: Feed[]) {
    const parser = new Parser();

    const feeds =
      data && data.length ? data : await this.prismaService.feed.findMany();

    feeds.forEach(async (item) => {
      const { id, link } = item;
      const feed = await parser.parseURL(link);

      this.logger.log(feed);

      await this.prismaService.feed.update({
        where: { id },
        data: {
          title: feed.title,
          description: feed.description,
          link: feed.link,
          feedUrl: feed.feedUrl,
        },
      });

      feed.items.forEach(async (item) => {
        this.logger.log(item);

        await this.prismaService.article.create({
          data: {
            title: item.title,
            author: item.author,
            link: item.link,
            guid: item.id,
            publishedAt: item.pubDate,
            feed: { connect: { id } },
          },
        });
      });
    });
  }
}
