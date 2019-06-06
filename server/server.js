const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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
  .then(() => {
      console.log("DB connected");
      mongoose.set('useCreateIndex', true);
    })
  .catch(err => console.error(err));

  // initialise application
const app = express();

// Setup cors so that client can talk to back end
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));

// JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null" && token !== undefined) {
    try {
        const currentUser = await jwt.verify(token, process.env.SECRET);
        req.currentUser = currentUser;
    } 
    catch (err) {
        console.log(error(err));
    }
  }
  next();
});

// Initialise ApolloServer with the associated typeDefs and resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ Recipe, User, currentUser: req.currentUser }),
});
const path = '/graphql';
server.applyMiddleware({ app, path })

// Listen to PORT specified
app.listen(PORT, () => {
    console.log(`Server listen on PORT ${PORT}`)
});