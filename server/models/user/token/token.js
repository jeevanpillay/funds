// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// validators
const { nameValidator,balanceValidator,addressValidator } = require("./token.validator");

// schemas
const Withdrawal = require("./withdrawal/withdrawal").Schema;
const Deposit = require("./deposit/deposit").Schema;

const TokenSchema = new Schema({
  _id: {
    type: String,
    required: true,
    uppercase: true,
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
    uppercase: true,
    unique: true,
    validator: addressValidator
  },
  balance: {
    type: Number,
    default: 0,
    validate: balanceValidator
  },
  withdrawals: {
    type: [Withdrawal],
  },
  deposits: {
    type: [Deposit],
  }
});

// export
module.exports = mongoose.model("Token", TokenSchema);
