import { Field, InputType } from '@nestjs/graphql';

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

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;
}
