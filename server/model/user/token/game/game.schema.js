const { gql } = require("apollo-server");

const game = gql`
  type Game {
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
    createGame(
      username: String!
      address: String!
      bet: Int!
      hash: String!
      multiplier: Float!
    ): Boolean
  }

  extend type Query {
    getUserGames(username: String!, address: String!): [Game]
  }
`;

module.exports = game;
