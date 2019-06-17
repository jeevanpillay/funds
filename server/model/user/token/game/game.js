const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  amountValidator,
} = require("./game.validator");

const GameSchema = new Schema({
  bet: {
    type: Number,
    required: true,
    validate: amountValidator
  },
  time: {
    type: Date,
    default: Date.now()
  },
  bonus: {
    type: Number,
    default: 0,
    validate: amountValidator
  },
  multiplier: {
    type: Number,
    required: true,
    validate: amountValidator
  },
  hash: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameHashes"
  }
});

module.exports = mongoose.model("Game", GameSchema);