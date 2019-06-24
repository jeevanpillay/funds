const mongoose = require('mongoose');
const check = require('check-types/src/check-types');

exports.resolvers = {
  Query: {
    getAllBetsOfUser: async (root, { address }, { User, Bet }) => {
      // error check
      const user = await User.findOne(
        { tokens: { $elemMatch: { _id: address, name: "VET" } } },
      );
      if (check.null(user)) throw new Error("User's tokens with that address doesn't exists");

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
      if (check.null(user)) throw new Error("User's tokens with that address doesn't exists");

      // get balance
      let balance = user.tokens[0].balance;
      if (check.greaterOrEqual(amount, balance)) throw new Error("User doesn't have the required balance");

      // create the bet
      let bet = await new Bet({
        amount: amount,
        multiplier: multiplier,
        hash: new mongoose.Types.ObjectId,
        address: address
      }).save();
      
      // save balance amount
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
      let user = await User.findOne(
        { tokens: { $elemMatch: { _id: address, name: "VET" } } },
        { "tokens.balance": 1 }
      );
      if (check.null(user)) throw new Error("User's tokens with that address doesn't exists");

      // get the betID
      let bet = await Bet.findOne({ _id: betID });
      bet.status = false;
      bet.save();

      // save balance amount
      let balance = user.tokens[0].balance;
      await User.updateOne(
        { tokens: { $elemMatch: { _id: address, name: "VET" } } },
        { $set: { "tokens.$.balance": balance + amount } }
      );

      return bet;
    },

    forceCloseBet: async (root, { address, betID } , { User, Bet }) => {
      // get user
      let user = await User.findOne(
        { tokens: { $elemMatch: { _id: address, name: "VET" } } },
      );
      if (check.null(user)) throw new Error("User's tokens with that address doesn't exists");

      // get the betID
      let bet = await Bet.findOne({ _id: betID });
      bet.status = false;
      bet.save();

      // return
      return bet;
    }
  }
};