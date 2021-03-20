import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App.jsx';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
require('dotenv')

const serverURL = process.env.NODE_ENV === 'production' ? 
    'https://iterate-server-x7jsd.ondigitalocean.app/graphql' :
      'http://localhost:4000/graphql';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: serverURL
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
