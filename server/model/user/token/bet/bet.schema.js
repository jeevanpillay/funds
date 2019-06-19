const {
  gql
} = require("apollo-server");

const bet = gql `
  type Bet {
    _id: String!
    amount: Int!
    time: String
    multiplier: Float!
    status: Boolean
    address: String!
    hash: String!
  }

  extend type Mutation {
    createBet(
      address: String!
      amount: Int!
      hash: String!
      multiplier: Float!
    ): Bet

    closeBet(
      address: String!
      amount: Int!
      betID: String!
    ): Bet

    forceCloseBet(
      address: String!
      betId: String!
    ): Bet
  }

  extend type Query {
    getAllBetsOfUser(address: String!): [Bet]
  }
`;

module.exports = bet;