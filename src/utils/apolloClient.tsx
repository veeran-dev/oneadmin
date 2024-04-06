import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getToken} from './TokenStorage'
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'Cache-Control': 'no-cache',
    }
  }
});

const client = new ApolloClient({
  link: concat(authLink, uploadLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});


export default client;