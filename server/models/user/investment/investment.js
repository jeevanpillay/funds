const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  nameValidator,
} = require("./investment.validator");

const InvestmentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    by: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
});


module.exports = mongoose.model("Investment", InvestmentSchema);
