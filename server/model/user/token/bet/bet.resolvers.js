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
      let user = await User.findOne(
        { tokens: { $elemMatch: { _id: address, name: "VET" } } },
        { "tokens.balance": 1 }
      );

      // type check
      if (!user) throw new Error("User's tokens with that address doesn't exists");
      if (check.greaterOrEqual(amount, user.tokens[0].balance)) throw new Error("User doesn't have the required balance");

      // create the Bet
      let bet = await new Bet({
        amount: amount,
        multiplier: multiplier,
        hash: new mongoose.Types.ObjectId,
        address: address
      });
      
      // get
      let balance = user.tokens[0].balance;

      // save to db
      await User.updateOne(
        { tokens: { $elemMatch: { _id: address, name: "VET" } } },
        { $set: { "tokens.$.balance": balance - amount } }
      );

      // return
      return bet;
    },
    closeBet: async (root, { address, amount, betID }, { User, Bet }) => {
      // check inputs
      if (check.greater(0, amount)) throw new Error("Bet amount should be more than 0")

      // get user
      const user = await User.findOne({
        tokens: {
          $elemMatch: {
            _id: address
          }
        }
      });

      // user check
      if (!user) throw new Error("User with that address doesn't exists");

      // update bet
      const bet = await Bet.findOne({
        betID
      });
      console.log(bet);
      bet.status = true;

      // update balance
      user.tokens[0].balance = user.tokens[0] + amount;

      // save
      await bet.save();
      await user.save();
    }
  }
};