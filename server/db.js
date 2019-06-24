const mongoose = require("mongoose");
const chalk = require("chalk");

// Configure Chalk
const error = chalk.bold.red;
const success = chalk.bold.green;
const connection = chalk.bold.magenta;
const environment = chalk.bold.blue;

// Blockchain imports
const Web3 = require("web3");
const Thorify = require("thorify").thorify;
const VechainService = require("./blockchain/vechain/vechain.service");

// Environments
require("dotenv").config({
    path: "variables.env"
  });
const THOR_NETWORK = process.env.THOR_NETWORK || "http://localhost:8669";
const MONGO_URI = process.env.MONGO_URI;

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
        // Configure Vechain Thor Setup
        const web3 = Thorify(new Web3(), THOR_NETWORK);
        const confirmation = 12;
        this._vechainService = new VechainService(web3, confirmation);
        console.log(success(`Succesfully created ${environment("block watch")} service!`));
    }
}