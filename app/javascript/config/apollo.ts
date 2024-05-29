import { InMemoryCache } from '@apollo/client';

/**
 * Apollo Client Configuration
 */
export const getApolloConfig = () => {
  return {
    uri: '/graphql',
    cache: new InMemoryCache(),
  };
}
