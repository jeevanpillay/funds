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
