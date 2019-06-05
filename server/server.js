const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({
    path: 'variables.env'
});

// import schema
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Create Schemas
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

// initialise application
const app = express();

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// Connect schema's with GraphQL
app.use('/graphql', graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listen on PORT ${PORT}`)
});