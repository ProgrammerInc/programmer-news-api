import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Article } from '../../article/models/article.model';

@ObjectType()
export class Feed {
  @Field((_type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  feedUrl?: string;

  @Field({ nullable: true })
  feedType?: string;

  @Field({ nullable: true })
  guid?: string;

  @Field()
  published: boolean;

  @Field((_type) => [Article])
  articles?: Article[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
