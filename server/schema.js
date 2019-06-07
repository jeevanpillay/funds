const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Query {
    getCurrentUser: User
    getUsersAddress: [String]
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
    privateKey: String!
    address: String!
  }
`