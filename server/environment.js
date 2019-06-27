// environment setup
require("dotenv").config({
    path: "variables.env"
  });

// enviroment
const PORT = process.env.PORT || 4444;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI;
const THOR_NETWORK = process.env.THOR_NETWORK || "http://localhost:8669";
const THOR_CONFIRMATION = process.env.THOR_CONFIRMATION || 1;

// export
module.exports = { 
    PORT,
    NODE_ENV, 
    MONGO_URI,
    THOR_NETWORK,
    THOR_CONFIRMATION
}
