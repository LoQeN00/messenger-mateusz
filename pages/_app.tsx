import '../styles/globals.css'

import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import client from '../lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import Layout from '../components/Layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default App
