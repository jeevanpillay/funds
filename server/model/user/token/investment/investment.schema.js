const { gql } = require("apollo-server");

const investment = gql`
  type Investment {
    _id: String!
    amount: Int!
    by: User
  }
`;

module.exports = investment;
