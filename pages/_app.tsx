import '../styles/globals.css'

import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import client from '../lib/apolloClient'
import { ApolloProvider } from '@apollo/client'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}

export default App
