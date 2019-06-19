const mongoose = require('mongoose');
const check = require('check-types');
const assert = require('assert');

exports.resolvers = {
  Query: {
    getAllBetsOfUser: async (root, { username, address }, { User, Bet }) => {
      // error check
      const user = await User.findOne({
        username,
        tokens: {
          $elemMatch: {
            _id: address
          }
        }
      });
      if (!user) {
        throw new Error("User with that address doesn't exists");
      }

      // get all Bets
      return await Bet.find({
        address: address
      })
    }
  },
  Mutation: {
    createBet: async (root, { address, amount, hash, multiplier }, { User, Bet }) => {
      // check inputs
      if (check.greaterOrEqual(1, multiplier)) throw new Error("Multiplier should be more than 1")
      if (check.greater(0, amount)) throw new Error("Bet amount should be more than 0")

      // get user
      const user = await User.findOne({
        tokens: {
          $elemMatch: {
            _id: address
          }
        }
      });

      // type check
      if (!user) throw new Error("User with that address doesn't exists");
      if (check.greaterOrEqual(amount, user.tokens[0].balance)) throw new Error("User doesn't have the required balance");

      // create the Bet
      const bet = new Bet({
        amount: amount,
        multiplier: multiplier,
        hash: new mongoose.Types.ObjectId,
        address: address
      })
      
      // add the bet to the user
      let bets = user.tokens[0].bets;
      bets.push(bet._id);

      // update balance and bets
      const balance = user.tokens[0].balance - amount;
      await User.updateOne({
        tokens: {
          $elemMatch: {
            _id: address
          }
        }
      }, {
        $set: {
          "tokens.$.balance": balance,
          "tokens.$.bets": bets
        }
      });

      return bet;
    }
  }
};