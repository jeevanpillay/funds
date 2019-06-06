const { gql } = require('apollo-server')
 
exports.typeDefs = gql`
  type Query {
    getCurrentUser: User
  }

  type Mutation {
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username:String!, password:String!): Token
  }

  type Token {
    token: String!
  }

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    coins: [Crypto]
  }

  type Crypto {
    _id: ID
    name: String!
    address: String!
    balance: Int!
  }
`