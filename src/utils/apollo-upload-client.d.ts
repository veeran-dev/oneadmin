// File: src/apollo-upload-client.d.ts

declare module 'apollo-upload-client/createUploadLink.mjs' {
    import { ApolloLink } from '@apollo/client';
  
    export default function createUploadLink(options?: any): ApolloLink;
  }
  