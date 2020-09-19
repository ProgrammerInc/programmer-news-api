import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ArticleInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ defaultValue: true })
  published: boolean;

  @Field(_type => Int)
  feedId: number;

  @Field({ nullable: true })
  publishedAt?: Date;
}
