'use strict';

// NodeJS dependencies Imports
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");

// Connections
const MongooseConnection = require('./db');
const GraphQLConnection = require('./api');

// Configure Chalk
const error = chalk.bold.red;
const success = chalk.bold.green;
const environment = chalk.bold.blue;

// Configure PORT
require("dotenv").config({
  path: "variables.env"
});
const PORT = process.env.PORT || 4444;
const NODE_ENV = process.env.NODE_ENV || "development";

// initialise application
const app = express();
const db = new MongooseConnection();
const gql = new GraphQLConnection();

// Setup cors so that client can talk to back end
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

// JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null" && token !== undefined && token !== null) {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(error(err));
    }
  }
  next();
});

// Setup GraphQL middleware, /graphql endpoint only setup
// during development environment
gql.server.applyMiddleware({ app })

// Listen to the Port
app.listen(PORT, () => {
  console.log(
    success(
      `Server listening on ${environment("PORT " + PORT + ": " + NODE_ENV)}`
    )
  );
});
