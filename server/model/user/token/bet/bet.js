const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  amountValidator,
  multiplierValidator
} = require("./bet.validator");

const BetSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    validate: amountValidator
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  bonus: {
    type: Number,
    default: 0,
    validate: multiplierValidator
  },
  multiplier: {
    type: Number,
    required: true,
    validate: multiplierValidator,
    alias: "cashOut"
  },
  status: {
    type: Boolean,
    default: false,
    alias: "hasEnded"
  },
  address: {
    type: String,
    required: true,
    alias: "creatorAddress"
  },
  hash: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GamesHash"
  }
});

module.exports = mongoose.model("Bet", BetSchema);
