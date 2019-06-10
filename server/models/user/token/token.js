const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { nameValidator,balanceValidator,addressValidator } = require("./token.validator");

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
  // withdrawals: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Withdrawal'
  // },
  // deposits: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Deposit'
  // }
});



module.exports = mongoose.model("Token", TokenSchema);