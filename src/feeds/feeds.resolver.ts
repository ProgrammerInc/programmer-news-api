import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Feed } from './models/feed.model';

@Resolver(_of => Feed)
export class FeedsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(_returns => Feed)
  async feed(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.feed.findOne({ where: { id } });
  }

  @Query(_returns => [Feed])
  async feeds() {
    return this.prismaService.feed.findMany();
  }
}
