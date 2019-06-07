// Imports
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const Web3 = require("web3");
const Thorify = require("thorify").thorify;

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

// Setup address
var address = {};

// connect to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(success(`Connected to ${connection("MongoDB")}!`));

    // Create a watch to ensure that new users data are added to the address variable
    // TODO: get rid of result and error
    User.watch().on("change", data => {
      const id = data.fullDocument._id;
      const addr = data.fullDocument.address;

      // subscribe to the addresses for incoming vet transfers
      const subscription = web3.eth.subscribe(
        "transfers",
        {
          recipient: addr
        },
        (error, result) => {
          if (error) {
            console.log(error(error));
          } else {
            console.log(result);
          }
        }
      );

      subscription.on("data", data => {
        const transactionValue = parseInt(data.amount.replace(/^#/, ''), 16);
        console.log("id",id);
        console.log("txval",transactionValue);
        User.update(
          { 
            _id: id 
          },
          {
            balance: transactionValue
          }
        );
      });

      subscription.on("changed", data => {
        console.log("changed", data);
      });

      address[addr] = subscription;
    });
  })
  .catch(err => console.log(error(err)));

mongoose.set("useCreateIndex", true);
// Configure Vechain Thor Setup
// Connection hosted on Digital Ocean currently.
// Connect to localhost:8669 if running locally/no internet.
// Check if connection is working:
// ---> thorify.eth.getBlock("latest").then(res => console.log(res));
const web3 = Thorify(new Web3(), THOR_NETWORK);

const addr = [
  "0x82f5488B078A1fBdFa959b944aBF3AA583f4109B",
  "0xf95cA4Bc8DAcBDd8045DDFD6CcB9ec06CFCf886E",
  "0xd76Fc92744BC85a63Fe4326F39707EEb03884b2C"
];

// // Setup subscription
// const subscription = web3.eth
//   .subscribe("newBlockHeaders", function(error, result) {
//     if (!error) {
//       return;
//     }
//   })
//   .on("data", function(blockHeader) {
//     // get block number
//     const blockNumber = blockHeader.number;

//     // find the block
//     web3.eth.getBlock(blockNumber).then(blockRes => {
//       // destructure transactions
//       const transactions = blockRes.transactions;

//       // iterate the transactions if there are transaction in the block
//       if (transactions) {
//         for (var tx of transactions) {
//           web3.eth
//             .getTransaction(tx)
//             .then(txRes => {
//               // get the clauses
//               const clauses = txRes.clauses;

//               if (clauses) {
//                 for (var clause of clauses) {
//                   const add = clause.to;
//                   if (addr.includes(add)) {
//                     console.log('works?');
//                   }
//                   // if (address[clause.to]) {
//                   //   console.log('yes');
//                   //   // User.updateOne(
//                   //   //   {
//                   //   //     _id: address[clause.to]
//                   //   //   },
//                   //   //   {
//                   //   //     balance: 1
//                   //   //   }
//                   //   // );
//                   // }
//                 }
//               }
//             })
//             .catch(err => console.log(error(err)));
//         }
//       }
//     }).catch(err => console.log(error(err)));
//   })
//   .on("error", console.error);

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
  context: ({ req }) => ({ User, currentUser: req.currentUser })
});
server.applyMiddleware({ app });

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
