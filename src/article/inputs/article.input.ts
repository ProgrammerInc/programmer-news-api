import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ArticleInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  language?: string;

  @Field()
  @IsNotEmpty()
  link: string;

  @Field({ nullable: true })
  guid?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ defaultValue: true })
  published: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field((_type) => Int)
  feedId: number;
}
