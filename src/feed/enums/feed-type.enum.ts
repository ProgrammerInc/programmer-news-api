import { registerEnumType } from '@nestjs/graphql';

export enum FeedType {
  ATOM,
  RSS,
  NONE,
}

registerEnumType(FeedType, {
  name: 'FeedType',
});
