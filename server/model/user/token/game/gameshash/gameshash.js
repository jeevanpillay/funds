// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
    crashValidator,
  } = require("./gameshash.validator");
  
const GamesHashSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    crash: {
        type: Number,
        required: true,
        validate: crashValidator
    },
    games: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Game'
    }
});
// exports
module.exports = mongoose.model("GamesHash", GamesHashSchema);