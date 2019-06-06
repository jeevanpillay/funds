// React imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Component Imports
import App from './components/App';
import Signin from './components/authentication/signin/signin';
import Signup from './components/authentication/signup/signup';

// Initialise routes (navigation)
const route = ( { refetch, session } ) => (
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

export default route;