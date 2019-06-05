const { gql } = require('apollo-server')
 
exports.typeDefs = gql`
  type Query {
    getAllRecipes: [Recipe]
  }

  type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }
 
  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }
`