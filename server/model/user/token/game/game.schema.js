const { gql } = require("apollo-server");

const game = gql`
  type Game {
    _id: String!
    bet: Int!
    time: String
    bonus: Int
    multiplier: Int!
    hash: String!
  }
`;

module.exports = game;
