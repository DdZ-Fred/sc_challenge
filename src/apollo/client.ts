import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com'
});

export default client;