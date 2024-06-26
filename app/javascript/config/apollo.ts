import {
  HttpLink, InMemoryCache,
} from '@apollo/client';

/**
 * Apollo Client Configuration
 */
export const getApolloConfig = () => {
  return {
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: '/graphql',
      credentials: 'include',
      headers: { 'X-CSRF-Token': getCSRFTokenFromDOM() },
    }),
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy: 'cache-first' as const,
        fetchPolicy: 'cache-first' as const,
      },
    },
    connectToDevTools: true, // NOTE: This is a security risk in production
  };
};
function getCSRFTokenFromDOM(): string {
  return getCSRFMetaTag().content;
}

function getCSRFMetaTag() {
  return document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
}
