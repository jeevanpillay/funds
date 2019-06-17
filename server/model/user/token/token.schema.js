const { gql } = require("apollo-server");

const token = gql`
  type Token {
    _id: String!
    name: String!
    privateKey: String!
    balance: Int
    withdrawals: [Withdrawal]
    deposits: [Deposit]
    investment: Investment
    games: [Game]
  }
`;

module.exports = token;
