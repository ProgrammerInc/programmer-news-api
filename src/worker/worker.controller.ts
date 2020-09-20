import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Feed } from '../feed/models/feed.model';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @EventPattern('feed_created')
  async handleFeedCreated(data: Feed) {
    return this.workerService.handleFeedCreated(data);
  }
}
