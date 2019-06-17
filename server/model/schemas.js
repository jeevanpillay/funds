const {
  gql
} = require("apollo-server");

// imports
const user = require("./user/user.schema");
const token = require("./user/token/token.schema");
const withdraw = require("./user/token/withdrawal/withdrawal.schema");
const deposit = require("./user/token/deposit/deposit.schema");
const game = require("./user/token/game/game.schema");
const gamehashes = require("./user/token/game/gamehashes/gamehashes.schema");
const investment = require("./user/token/investment/investment.schema");

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