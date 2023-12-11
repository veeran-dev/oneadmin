import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getToken} from './TokenStorage'
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  console.log("token is...",getToken())
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: concat(authLink, uploadLink),
  cache: new InMemoryCache()
});


export default client;