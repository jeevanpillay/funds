const { gql } = require("apollo-server");

const game = gql`
  type Game {
    _id: String!
    bet: Int!
    time: String
    bonus: Int
    multiplier: Int!
    hash: GamesHash!
  }
`;

module.exports = game;
