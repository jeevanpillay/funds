import React from 'react';
import './App.css';

import { Query } from 'react-apollo';
 
const App = () => (
  <div className="App">
  <h1>Home</h1>
  {/* <Query>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>
      console.log(data);
      return (
        <p>
          Recipes
        </p>
      )
    }}
  </Query> */}

  </div>
);

export default App;
