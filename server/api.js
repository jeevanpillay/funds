// Import Mongoose and GraphQL essentials
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./model/schemas");
const resolvers = require("./model/resolvers");
const [ 
  User, 
  Token, 
  Withdrawal, 
  Deposit, 
  Investment, 
  Bet, 
  GamesHash 
] = require("./model/models");

module.exports = class GraphQLConnection {
    constructor(Vechain) {
        // Initialise ApolloServer with the associated typeDefs and resolvers.
        this._server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => ({
                currentUser: req.currentUser,
                User,
                Token,
                Withdrawal,
                Deposit,
                Investment, 
                Bet, 
                GamesHash,
                Vechain
            })
        });
    }

    get server() {
        return this._server;
    }
}