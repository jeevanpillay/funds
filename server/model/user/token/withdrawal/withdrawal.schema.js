const { gql } = require("apollo-server");

const withdrawal = gql`
  extend type Query {
    getUserWithdrawals(username: String!, address: String!): [Withdrawal]
  }

  extend type Mutation {
    withdrawFunds(
      username: String!
      addressFrom: String!
      addressTo: String!
      amount: Int!
    ): Boolean
  }

  type Withdrawal {
    _id: ID
    amount: Int!
    time: String
    confirmations: Int
    address: String!
  }
`;

module.exports = withdrawal;
