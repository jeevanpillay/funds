// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// validators
const { nameValidator,balanceValidator,addressValidator } = require("./token.validator");

const TokenSchema = new Schema({
  _id: {
    type: String,
    required: true,
    alias: "address",
    validator: addressValidator
  },
  name: {
    type: String,
    default: "VET",
    enum: [
        "VET",
        "SHA",
        "OCE",
        "PLA"
    ],
    trim: true,
    uppercase: true,
    validator: nameValidator
  },
  privateKey: {
    type: String,
    required: true,
    unique: true,
    validator: addressValidator
  },
  balance: {
    type: Number,
    default: 0,
    validate: balanceValidator
  },
  withdrawals: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Withdrawal'
  },
  deposits: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Deposit' 
  },
  bets: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Bet' 
  },
  investment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Investment"
  }
});

// export
module.exports = mongoose.model("Token", TokenSchema);
