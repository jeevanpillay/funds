const mongoose = require("mongoose");
const chalk = require("chalk");

// Configure Chalk
const error = chalk.bold.red;
const success = chalk.bold.green;
const environment = chalk.bold.blue;

// Blockchain imports
const VechainService = require("./blockchain/vechain/vechain.service");
const GraphQLConnection = require('./api');

// Environments
const { MONGO_URI } = require("./environment");

// MongoDB connection class
module.exports = class MongooseConnection {
    constructor() {
        this._uri = MONGO_URI;
    }

    async setupMongoDBService() {
        // connect to database
        await mongoose.set("useCreateIndex", true);
        await mongoose
        .connect(this._uri, { useNewUrlParser: true })
        .then(async () => {    
            // connected to DB
            console.log(success(`Connected to ${environment("MongoDB")}!`));

            // setup vechain deposit service
            await this.setupVechainService();

            // setup graphql
            this.setupGraphQLService();
        })
        .catch(err => console.log(error(err)));
        
        // return the services
        return {
            vechain: this.vechain,
            server: this.gql.server
        }
    }

    setupGraphQLService() {
        this._gql = new GraphQLConnection(this.vechain);
    }

    async setupVechainService() {
        this._vechainService = new VechainService();
        await this._vechainService.setupWallet();
        await this._vechainService.setupBlockWatchService();
    }

    get gql() {
        return this._gql;
    }

    get vechain() {
        return this._vechainService;
    }
}