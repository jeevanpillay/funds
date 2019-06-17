const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  amountValidator
} = require("./investment.validator");

const InvestmentSchema = new Schema({
    amount: {
        type: Number,
        default: 0,
        validate: amountValidator
    },
    by: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
});


module.exports = mongoose.model("Investment", InvestmentSchema);
