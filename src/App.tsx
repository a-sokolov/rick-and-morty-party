import React from 'react';
// GraphQL
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// Application components
import AppRoot from './AppRoot';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL // eslint-disable-line no-undef
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <AppRoot />
    </ApolloProvider>
  );
}

export default App;
