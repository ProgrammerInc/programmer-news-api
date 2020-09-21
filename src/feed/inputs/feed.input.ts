import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { FeedType } from '../enums/feed-type.enum';

@InputType()
export class FeedInput {
  @Field()
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

  @Field({ nullable: true })
  @IsNotEmpty()
  link: string;

  @Field({ nullable: true })
  feedUrl?: string;

  @Field((_type) => FeedType, { defaultValue: FeedType.NONE })
  feedType: FeedType;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
