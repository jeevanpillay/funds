const { gql } = require('apollo-server')
 
exports.typeDefs = gql`
  type Query {
    getAllRecipes: [Recipe]
  }

  type Mutation {
    addRecipe(
      name: String!,
      description: String!,
      category: String!,
      instructions: String!,
      username: String
    ): Recipe

    signupUser(username: String!, email: String!, password: String!): Token
  }

  type Token {
    token: String!
  }

  type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }
 
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }
`