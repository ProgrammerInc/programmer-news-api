import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Article } from '../../article/models/article.model';

@ObjectType()
export class Feed {
  @Field((_type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  language?: string;

  @Field()
  link: string;

  @Field({ nullable: true })
  feedUrl?: string;

  @Field({ nullable: true })
  feedType?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field()
  published: boolean;

  @Field((_type) => [Article])
  articles?: Article[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
