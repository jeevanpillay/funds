const { gql } = require("apollo-server");

const gameshash = gql`
  type GamesHash {
    _id: String!
    crash: Int!
    games: [Game]
  }
`;

module.exports = gameshash;
