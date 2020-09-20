import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Feed } from '../feed/models/feed.model';

@Injectable()
export class WorkerService {
  async handleFeedCreated(data: Feed) {
    const parser = new Parser();

    const feed = await parser.parseURL(data.link);
    console.log(feed);

    feed.items.forEach((item) => {
      console.log(item);
    });
  }
}
