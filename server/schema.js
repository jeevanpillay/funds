const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Query {
    getCurrentUser: User
    getUserWithdrawals(username: String!, address: String!): [Withdrawal]
    getUserDeposits(username: String!, address: String!): [Deposit]
  }

  type Mutation {
    signupUser(username: String!, email: String!, password: String!): AuthToken
    signinUser(username:String!, password:String!): AuthToken
    withdrawFunds(username: String!, addressFrom: String!, addressTo: String!, amount: Int!): Boolean
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
    address: String!
  }

  type Deposit {
    _id: ID
    amount: Int!
    time: String
    confirmations: Int
    address: String!
  }
`