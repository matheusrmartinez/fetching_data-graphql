import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`GraphQL Error: ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: 'http://localhost:6969/graphql'}),
]);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default client;