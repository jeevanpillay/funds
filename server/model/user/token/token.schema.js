const { gql } = require("apollo-server");

const token = gql`
  type Token {
    _id: String!
    name: String!
    privateKey: String!
    balance: Int
    investment: Investment
  }
`;

module.exports = token;
