// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// Apollo imports
import { ApolloProvider } from 'react-apollo';
import client from './apollo';

// CSS imports
import './index.css';

// Essential impprts
import withSession from "./components/authentication/withSession";
import route from "./routes";

// Render with session
const RootWithSession = withSession(route);

// Render Component
const render = Component =>
  ReactDOM.render(
    <ApolloProvider client={client}>
        <Component />
    </ApolloProvider>,
    document.getElementById("root")
  );

// Render
render(RootWithSession);
