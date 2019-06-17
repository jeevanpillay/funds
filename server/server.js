// Imports
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const Web3 = require("web3");
const Thorify = require("thorify").thorify;
const VechainBlockchain = require("./models/blockchain/vechain");

// Configure Chalk
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
const User = require("./models/user/user");
const Token = require("./models/user/token/token");
const Withdrawal = require("./models/user/token/withdrawal/withdrawal");
const Deposit = require("./models/user/token/deposit/deposit");
const Investment = require("./models/user/token/investment/investment");

// Create Schemas
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// connect to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(success(`Connected to ${connection("MongoDB")}!`));

    // creating a fake service
    VechainBlockchain.createWatchServiceFake(web3);
  })
  .catch(err => console.log(error(err)));

mongoose.set("useCreateIndex", true);

// Configure Vechain Thor Setup
const web3 = Thorify(new Web3(), THOR_NETWORK);

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
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    Token,
    User,
    currentUser: req.currentUser,
    Withdrawal,
    Deposit,
    Investment
  })
});
server.applyMiddleware({ app })

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
