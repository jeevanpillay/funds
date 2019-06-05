import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components
import './index.css';
import App from './components/App';
import Signin from './components/authentication/signin/signin';
import Signup from './components/authentication/signup/signup';
import withSession from "./components/authentication/withSession";

// Apollo imports
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Initialise ApolloClient
const client = new ApolloClient({
    // initialise uri endpoints
    uri: "http://localhost:4444/graphql",

    // Send authorization token to the JWT middleware
    fetchOptions: {
        credentials: "include"
    },
    request: operation => {
        //request for user's token to authenticate
        const token = localStorage.getItem("token");
        operation.setContext({
            headers: { 
                authorization: token
            }
        })
    },

    // Issue when the is an error
    onError: ({ networkError }) => {
        if (networkError) {
            console.log('Network Error', networkError);

            if (networkError.statusCode === 401) {
                localStorage.removeItem("token")
            }
        }
    }
});

// Initialise routes (navigation)
const RouteRoot = ( { refetch, session } ) => (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        {/* <Route
          path="/administration"
          render={() => <Administration refetch={refetch} session={session} />}
        /> */}
        <Redirect to="/" />
      </Switch>
    </Router>
);

// Render with session
const RootWithSession = withSession(RouteRoot);

// Render Component
const render = Component =>
  ReactDOM.render(
    <ApolloProvider client={client}>
        <Component />
    </ApolloProvider>,
    document.getElementById("root")
  );

render(RootWithSession);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
