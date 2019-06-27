const mongoose = require("mongoose");
const chalk = require("chalk");

// Configure Chalk
const error = chalk.bold.red;
const success = chalk.bold.green;
const environment = chalk.bold.blue;

// Blockchain imports
const VechainService = require("./blockchain/vechain/vechain.service");

// Environments
const { MONGO_URI } = require("./environment");

// MongoDB connection class
module.exports = class MongooseConnection {
    constructor() {
        this._uri = MONGO_URI;
        this._vechainService = new VechainService();
    }

    async setupMongoDBService() {
        // connect to database
        await mongoose.set("useCreateIndex", true);
        await mongoose
        .connect(
            this._uri, 
            { useNewUrlParser: true }
        )
        .then(async () => {    
            // connected to DB
            console.log(success(`Connected to ${environment("MongoDB")}!`));

            // setup vechain deposit service
            await this.setupVechainService();
        })
        .catch(err => console.log(error(err)));
        
        // return the services
        return {
            vechain: this.vechain,
        }
    }

    async setupVechainService() {
        await this._vechainService.setupUserWallet();
        await this._vechainService.setupBlockWatchService();
    }

    get vechain() {
        return this._vechainService;
    }
}