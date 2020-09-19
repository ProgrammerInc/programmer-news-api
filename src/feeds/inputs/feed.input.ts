import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FeedInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  feedType?: string;

  @Field({ defaultValue: true })
  isActive: boolean;
}