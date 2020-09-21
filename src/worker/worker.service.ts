import { Injectable, Logger } from '@nestjs/common';
import metascraper from 'metascraper';
import metaAuthor from 'metascraper-author';
import metaClearbit from 'metascraper-clearbit';
import metaDate from 'metascraper-date';
import metaDescription from 'metascraper-description';
import metaImage from 'metascraper-image';
import metaLang from 'metascraper-lang';
import metaLogo from 'metascraper-logo';
import metaLogoFavicon from 'metascraper-logo-favicon';
import metaPublisher from 'metascraper-publisher';
import metaTitle from 'metascraper-title';
import metaUrl from 'metascraper-url';
import fetch from 'node-fetch';
import Parser from 'rss-parser';
import { Feed } from '../feed/models/feed.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkerService {
  constructor(private prismaService: PrismaService) {}

  private readonly logger = new Logger(WorkerService.name);
  private readonly scraper = metascraper([
    metaAuthor(),
    metaDate(),
    metaDescription(),
    metaImage(),
    metaLang(),
    metaLogo(),
    metaClearbit(),
    metaLogoFavicon(),
    metaPublisher(),
    metaTitle(),
    metaUrl(),
  ]);

  async feedCreated(data: Feed) {
    const parser = new Parser();

    const { id, link } = data;

    const response = await fetch(link);
    const contentType = response.headers.get('content-type');
    const isXML = contentType.startsWith('application/xml');
    const isATOM = contentType.startsWith('application/atom+xml');
    const isRSS = contentType.startsWith('application/rss+xml');

    if (isATOM || isRSS || isXML) {
      const body = await response.text();
      const metadata = await this.scraper({ html: body, url: link });

      this.logger.debug(metadata);

      const feed = await parser.parseURL(link);

      await this.prismaService.feed.update({
        where: { id },
        data: {
          title: feed.title || metadata.title,
          description: feed.description || metadata.description,
          author: metadata.author,
          image: metadata.image,
          publisher: metadata.publisher,
          link: feed.link || metadata.url,
          feedUrl: feed.feedUrl,
          feedType: isATOM ? 'ATOM' : isRSS ? 'RSS' : 'NONE',
        },
      });

      feed.items.forEach(async (item) => {
        this.logger.debug(item);

        const response = await fetch(item.link);
        const body = await response.text();
        const metadata = await this.scraper({ html: body, url: link });

        await this.prismaService.article.create({
          data: {
            title: item.title || metadata.title,
            description: metadata.description || item.contentSnippet,
            content: item.content,
            author: item.author || item.creator || metadata.author,
            publisher: metadata.publisher,
            link: item.link || metadata.url,
            image: metadata.image,
            guid: item.id,
            publishedAt: item.pubDate || metadata.date,
            feed: { connect: { id } },
          },
        });
      });
    }
  }

  async updateFeeds(data: Feed[]) {
    const parser = new Parser();

    const feeds =
      data && data.length ? data : await this.prismaService.feed.findMany();

    feeds.forEach(async (item) => {
      const { id, link } = item;
      const feed = await parser.parseURL(link);

      feed.items.forEach(async (item) => {
        this.logger.debug(item);

        const response = await fetch(item.link);
        const body = await response.text();
        const metadata = await this.scraper({ html: body, url: link });

        await this.prismaService.article.create({
          data: {
            title: item.title || metadata.title,
            description: metadata.description || item.contentSnippet,
            content: item.content,
            author: item.author || item.creator || metadata.author,
            publisher: metadata.publisher,
            link: item.link || metadata.url,
            image: metadata.image,
            guid: item.id,
            publishedAt: item.pubDate || metadata.date,
            feed: { connect: { id } },
          },
        });
      });
    });
  }
}
