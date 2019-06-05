const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

// Configure PORT
require('dotenv').config({
    path: 'variables.env'
});
const PORT = process.env.PORT || 4444;

// Mongoose Models
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Create Schemas
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// connect to database
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// initialise application
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ Recipe, User }),
});

server.applyMiddleware({ app })

app.listen(PORT, () => {
    console.log(`Server listen on PORT ${PORT}`)
});