const { gql } = require("apollo-server");

const gamehashes = gql`
  type GameHashes {
    _id: String!
    crash: Int!
    games: [Game]
  }
`;

module.exports = gamehashes;
