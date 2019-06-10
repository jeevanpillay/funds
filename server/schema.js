const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Query {
    getCurrentUser: User
  }

  type Mutation {
    signupUser(username: String!, email: String!, password: String!): AuthToken
    signinUser(username:String!, password:String!): AuthToken
  }

  type AuthToken {
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
    balance: Int
    tokens: [Token]
  }

  type Token {
    _id: String!
    name: String!
    privateKey: String!
    balance: Int
    withdrawals: [Withdrawal]
    deposits: [Deposit]
  }

  type Withdrawal {
    _id: ID
    amount: Int!
    time: String
    confirmations: Int
  }

  type Deposit {
    _id: ID
    amount: Int!
    time: String
    confirmations: Int
  }
`