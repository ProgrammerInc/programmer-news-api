import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Feed } from '../../feeds/models/feed.model';

@ObjectType()
export class Article {
  @Field(_type => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  url?: string;

  @Field(_type => Feed)
  feed?: Feed;

  @Field(_type => Int)
  feedId: number;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
