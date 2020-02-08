import React from 'react';
// GraphQL
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// Application components
import AppRoot from './components/AppRoot.js';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <AppRoot />
    </ApolloProvider>
  );
}

export default App;
