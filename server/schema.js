const { gql } = require("apollo-server");

const user = require("./models/user/user.schema");
const token = require("./models/user/token/token.schema");
const withdraw = require("./models/user/token/withdrawal/withdrawal.schema");
const deposit = require("./models/user/token/deposit/deposit.schema");

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

module.exports = [root, user, token, withdraw, deposit];
