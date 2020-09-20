import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
