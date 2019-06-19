const { gql } = require("apollo-server");

const bet = gql`
  type Bet {
    _id: String!
    bet: Int!
    time: String
    bonus: Int
    multiplier: Float!
    status: Boolean
    address: String!
    hash: String!
  }

  extend type Mutation {
    createBet(
      username: String!
      address: String!
      bet: Int!
      hash: String!
      multiplier: Float!
    ): Boolean

    endBet(hash: String!, users: [String]!): Boolean
  }

  extend type Query {
    getUserBets(username: String!, address: String!): [Bet]
  }
`;

module.exports = bet;
