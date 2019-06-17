const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { 
    amountValidator, 
    confirmationsValidator,
    addressValidator
} = require("./withdrawal.validator");

const WithdrawalSchema = new Schema({
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
  },
  address: {
      type: String,
      required: true,
      validate: addressValidator,
  }
});

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
