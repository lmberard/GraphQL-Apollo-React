import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Import apollo stuff
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// 2. Initialice apolloClient 
const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/', // url for a graphQL server (this link creates one)
  cache: new InMemoryCache(), //cache is an instance of InMemoryCache
});


// 3. Connect the data (simple way)
client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

  
// 4. Connect client with React: for that we need ApolloProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
// we are going to wrap the react component:
//before:
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//after:
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

reportWebVitals();
