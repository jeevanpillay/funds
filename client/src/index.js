import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components
import './index.css';
import App from './components/App';
import Signin from './components/authentication/signin/signin';
import Signup from './components/authentication/signup/signup';

// Apollo initialiser
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
    uri: "http://localhost:4444/graphql"
});

const Root = () => (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        {/* <Route path="/signin" render={() => <Signin refetch={refetch} />} /> */}
        {/* <Route path="/signup" render={() => <Signup refetch={refetch} />} /> */}
        {/* <Route
          path="/administration"
          render={() => <Administration refetch={refetch} session={session} />}
        /> */}
        <Redirect to="/" />
      </Switch>
    </Router>
);

// Render react dom
ReactDOM.render(
    <ApolloProvider client={client}> 
        <Root />
    </ApolloProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
