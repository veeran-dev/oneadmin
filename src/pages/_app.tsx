import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/apolloClient';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/context/UserContext';
import { useEffect } from 'react';
import { getToken } from '@/utils/TokenStorage';
import { useRouter } from 'next/router';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


loadDevMessages();
loadErrorMessages();

export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
  const router = useRouter()
  useEffect(()=>{
    if(getToken() === "" || getToken()===undefined){
      router.push("/auth/login")
    }
  },[])

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ApolloProvider>
    </GoogleOAuthProvider>
  )
}