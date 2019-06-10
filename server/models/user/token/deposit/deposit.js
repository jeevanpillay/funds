const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  amountValidator,
  confirmationsValidator
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
  confirmations: {
    type: Number,
    default: 0,
    validate: confirmationsValidator
  }
});

module.exports = mongoose.model("Deposit", DepositSchema);
