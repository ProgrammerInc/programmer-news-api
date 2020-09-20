import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '../../category/models/category.model';
import { Feed } from '../../feed/models/feed.model';

@ObjectType()
export class Article {
  @Field((_type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  guid?: string;

  @Field((_type) => Feed)
  feed?: Feed;

  @Field((_type) => Int)
  feedId?: number;

  @Field()
  published: boolean;

  @Field((_type) => [Category])
  categories?: Category[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
