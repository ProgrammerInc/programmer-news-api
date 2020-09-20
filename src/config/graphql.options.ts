import * as path from 'path';

export const graphqlOptions = {
  autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  debug: false,
  playground: true,
  installSubscriptionHandlers: true,
};
