import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './TaskManager/App';
import {
  ApolloClient, ApolloProvider,
} from '@apollo/client';
import { getApolloConfig } from './config/apollo';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient(getApolloConfig());

const app = document.getElementById('root');
const root = createRoot(app);
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
