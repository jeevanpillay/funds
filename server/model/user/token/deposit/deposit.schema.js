const { gql } = require("apollo-server");

const deposit = gql`
  type Deposit {
    _id: ID
    amount: Int!
    time: String
    confirmation: Int
    fromAddress: String!
    toAddress: String!
    blockNumber: Int!
    txid: String!
  }

  extend type Query {
    getUserDeposits(username: String!, address: String!): [Deposit]
  }
`;

module.exports = deposit;
