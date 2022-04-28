import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { w3cwebsocket } from 'websocket'
import http from 'http'

import { ApolloClient, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'https://messapi.herokuapp.com/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://messapi.herokuapp.com/graphql',
    webSocketImpl: w3cwebsocket,
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default client
