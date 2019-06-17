const {
  gql
} = require("apollo-server");

// imports
const user = require("./models/user/user.schema");
const token = require("./models/user/token/token.schema");
const withdraw = require("./models/user/token/withdrawal/withdrawal.schema");
const deposit = require("./models/user/token/deposit/deposit.schema");
const game = require("./models/user/token/game/game.schema");
const gamehashes = require("./models/user/token/game/gamehashes/gamehashes.schema");
const investment = require("./models/user/token/investment/investment.schema");

// root
const root = gql `
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

// export
module.exports = [
  root,
  user, 
  token, 
  withdraw, 
  deposit, 
  game, 
  gamehashes,
  investment
];