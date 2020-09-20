import { Field, InputType } from '@nestjs/graphql';
import { FeedType } from '../enums/feed-type.enum';

@InputType()
export class FeedInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  feedUrl?: string;

  @Field((_type) => FeedType, { defaultValue: FeedType.NONE })
  feedType: FeedType;

  @Field({ defaultValue: true })
  published: boolean;
}
