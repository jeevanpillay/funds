// Imports
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const  InMemoryCache = require('apollo-cache-inmemory');
const gql = require('graphql-tag');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const Web3 = require("web3");
const Thorify = require("thorify").thorify;
const { graphql } = require('graphql');

// Configure chalk
const error = chalk.bold.red;
const success = chalk.bold.green;
const connection = chalk.bold.magenta;

// Configure PORT
require("dotenv").config({
  path: "variables.env"
});
const PORT = process.env.PORT || 4444;
const NODE_ENV = process.env.NODE_ENV || "development";
const THOR_NETWORK = process.env.THOR_NETWORK || "http://localhost:8669";

// Mongoose Models
const User = require("./models/User");

// Create Schemas
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// connect to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(success(`Connected to ${connection("MongoDB")}!`));
  })
  .catch(err => console.log(error(err)));

mongoose.set("useCreateIndex", true);

// Configure Vechain Thor Setup
// Connection hosted on Digital Ocean currently.
// Connect to localhost:8669 if running locally/no internet.
// Check if connection is working:
// ---> thorify.eth.getBlock("latest").then(res => console.log(res));
const web3 = Thorify(new Web3(), THOR_NETWORK);
// web3.eth.getBlock("latest").then(res => console.log("latest",res));
// web3.eth.getChainTag().then(res => console.log("chain",res));
const accounts = [
  "0x82f5488B078A1fBdFa959b944aBF3AA583f4109B",
  "0xf95cA4Bc8DAcBDd8045DDFD6CcB9ec06CFCf886E",
  "0xd76Fc92744BC85a63Fe4326F39707EEb03884b2C"
];

const subscription = web3.eth
  .subscribe("newBlockHeaders", function(error, result) {
    if (!error) {
      // console.log(result);
      return;
    }
    console.log(error(error));
  })
  .on("data", function(blockHeader) {
    // get block number
    const blockNumber = blockHeader.number;

    // find the block
    web3.eth.getBlock(blockNumber).then(blockRes => {
      // destructure transactions
      const transactions = blockRes.transactions;

      // iterate the transactions if there are transaction in the block
      if (transactions) {
        for (var tx of transactions) {
          web3.eth
            .getTransaction(tx)
            .then(txRes => {
              // get the clauses
              const clauses = txRes.clauses;
              if (clauses) {
                for (var clause of clauses) {
                  console.log(clause.to, clause.value);
                  // if (accounts.includes(clause.to)) console.log(true);
                  // else console.log(false);
                }
              }
            })
            .catch(err => console.log(error(err)));
        }
      }
    });
  })
  .on("error", console.error);

// initialise application
const app = express();

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

// Initialise ApolloServer with the associated typeDefs and resolvers.
const path = "/graphql";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ User, currentUser: req.currentUser })
});
server.applyMiddleware({ app, path });

// // Initialise ApolloClient
// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'http://localhost:4444/graphql' }),
//   cache: new InMemoryCache()
// });

// client.query({
//   query: gql`
//     query users {
//       users {
//         id
//         fullName
//         email
//       }
//     }
//   `,
// })
// .then(({data}) => appendData(data))
// .catch(error => console.error(error));

// Listen to the Port
app.listen(PORT, () => {
  console.log(
    success(
      `Server listening on ${chalk.blue("PORT " + PORT)}: ${connection(
        NODE_ENV
      )}`
    )
  );
});
