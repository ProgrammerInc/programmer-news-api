import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CategoryInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
