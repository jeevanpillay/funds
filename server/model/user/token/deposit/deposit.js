const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  amountValidator,
  addressValidator
} = require("./deposit.validator");

const DepositSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    validate: amountValidator
  },
  time: {
    type: Date,
    default: Date.now()
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
  fromAddress: {
    type: String,
    required: true,
    validate: addressValidator,
  },
  toAddress: {
    type: String,
    required: true,
    validate: addressValidator,
  },
  blockNumber: {
    type: Number,
    required: true
  },
  txid: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Deposit", DepositSchema);
