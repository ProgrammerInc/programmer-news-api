/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Feed } from './models/feed.model';

@Resolver(of => Feed)
export class FeedsResolver {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  @Query(returns => Feed)
  async feed(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.feed.findOne({ where: { id }});
  }

  @Query(returns => [Feed])
  async feeds() {
    return this.prismaService.feed.findMany();
  }
}