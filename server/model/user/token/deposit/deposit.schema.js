const { gql } = require("apollo-server");

const deposit = gql`
  type Deposit {
    _id: ID
    amount: Int!
    time: String
    confirmations: Int
    address: String!
  }

  extend type Query {
    getUserDeposits(username: String!, address: String!): [Deposit]
  }
`;

module.exports = deposit;
