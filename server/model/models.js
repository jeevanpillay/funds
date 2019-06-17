// lodash
const merge = require('lodash').merge;

// imports
const User = require("./user/user");
const Token = require("./user/token/token");
const Withdrawal = require("./user/token/withdrawal/withdrawal");
const Deposit = require("./user/token/deposit/deposit");
const Investment = require("./user/token/investment/investment");
const Game = require("./user/token/game/game");
const GameHashes = require("./user/token/game/gamehashes/gamehashes");

// export
module.exports = [
    User, 
    Token, 
    Withdrawal, 
    Deposit, 
    Investment, 
    Game, 
    GameHashes
]
