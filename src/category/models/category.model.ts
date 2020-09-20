import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Article } from '../../article/models/article.model';

@ObjectType()
export class Category {
  @Field((_type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ defaultValue: true })
  published: boolean;

  @Field((_type) => [Article])
  articles?: Article[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
