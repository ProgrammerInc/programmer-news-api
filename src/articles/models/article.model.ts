import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field()
  isActive: boolean;
}
