import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @EventPattern('feed_created')
  async handleFeedCreated(data: Record<string, unknown>) {
    return this.workerService.handleFeedCreated(data);
  }
}
