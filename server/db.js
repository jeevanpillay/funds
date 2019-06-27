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
        this.createConnection();
    }

    createConnection() {
        // connect to database
        mongoose
        .connect(this._uri, { useNewUrlParser: true })
        .then(() => {    
            // connected to DB
            console.log(success(`Connected to ${environment("MongoDB")}!`));

            // setup blockchain deposit service
            this.setupBlockchainService();
        })
        .catch(err => console.log(error(err)));

        mongoose.set("useCreateIndex", true);
    }

    setupBlockchainService() {
        this._vechainService = new VechainService();
        console.log(success(`Succesfully created ${environment("block watch")} service!`));
    }
}