import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  async handleFeedCreated(data: Record<string, unknown>) {
    console.log(data);
  }
}
