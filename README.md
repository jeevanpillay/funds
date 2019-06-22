# veBomb

This application form the base files of the veBomb application. It will initially be used for a game similar to Bustabit, but will be extended to other similar games as well.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This guide will assume that you have already installed node and it's dependencies globally on your machine. However, we do recommend that yarn is used instead of npm, therefore the following setup will be for yarn configurations. With that being said, it should still be able to work with npm.

### Installing

A step by step series of examples that tell you how to get a development env running
The server and the client will run independently.

Installing the server
```
cd server
yarn
```

Installing the client
```
cd client
yarn
```

## Running the tests

```
cd server
yarn test
```

## Essential knowledge to understand how some service works
* Provably Fair
  * The application is built around this concept of provably fair games, whereby, users are able to prove that the integrity of the game has not been compromised
  * This is achieved through the management of serverSeed and hostServer, whereby the serverSeed is created at project inception
    * We can arbritarily generate a list of N serverSeeds through a seeding event
    * N must be large as 1e7 when in production
* Management of user accounts
  * Hierarchical Deterministic keys
* Deposit and Withdrawal
    * For development enviroment, we create a service that subscribe's to the transfer of each account
      * O(N), where N is the number of acccounts in the system
      * This is really slow onces N > M
    * For production enviroment, we subscribe to the block service and check clauses if the user's account has a deposit/withdrawal
      * O(M), where M is the number of transaction in the system
      * Also, the number of confirmations is an arbritray number that can be set to 1 if you want fast confirmation times
* Vechain Thor
  * Initial blockchain that we are running the application on
  * It's important to understand the difference between Ethereum and Vechain's transaction
    * Specifically how clauses work in Vechain
    
## Built With
Essentially we are using MERN stack as the basis of the application. 

* [MongoDB](https://www.mongodb.com/) - NoSQL database
* [ExpressJS](https://expressjs.com/) - Web framework for NodeJS
* [React](https://reactjs.org/) - The front end framework to build the UI
* [NodeJS](https://nodejs.org/en/) - The Javascript runtime library
* [GraphQL](https://graphql.org/) - The API framework used
* [ApolloClient](https://www.apollographql.com/docs/react/) - The API enabler that allows us to use GraphQL in React.
* [NextJS](https://nextjs.org/docs) - Enabler for certain front end things like server side render, hot module replacement.

## Inspirations
* [Bustabit](www.bustabit.com) - The initial application is based on this
