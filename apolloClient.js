import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api.succubus.space/graphql',
  cache: new InMemoryCache()
})
