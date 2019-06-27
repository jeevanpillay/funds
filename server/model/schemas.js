const {
  gql
} = require("apollo-server");

// imports
const user = require("./user/user.schema");
const token = require("./user/token/token.schema");
const withdraw = require("./user/token/withdrawal/withdrawal.schema");
const deposit = require("./user/token/deposit/deposit.schema");
const bet = require("./user/token/bet/bet.schema");
const gameshash = require("./user/token/game/gameshash/gameshash.schema");
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
  bet, 
  gameshash,
  investment
];