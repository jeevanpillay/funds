const mongoose = require('mongoose');

exports.resolvers = {
  Query: {
    getUserBets: async (root, {
      username,
      address
    }, {
      User,
      Bet
    }) => {
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
    createBet: async (root, {
      username,
      address,
      amount,
      hash,
      multiplier
    }, {
      User,
      Bet
    }) => {
      // get user
      const user = await User.findOne({
        username,
        tokens: {
          $elemMatch: {
            _id: address
          }
        }
      });
      
      // type check
      if (!user) throw new Error("User with that address doesn't exists");
      if (user.tokens[0].balance < 0) throw new Error("User doesn't have the required balance");

      // create the Bet
      const bet = await new Bet({
        amount: amount,
        multiplier: multiplier,
        hash: new mongoose.Types.ObjectId,
        address: address
      }).save();

      // add the Bet to the user
      let bets = user.tokens[0].Bets;
      bets.push(bet._id);

      // update balance
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

      return true;
    },

    endBet: async (root, {
      hash,
      users,
      crashpoint
    }, {
      User,
      Bet,
      GamesHash
    }) => {
      // error checker
      // const GamesHash = await GamesHash({
      //   hash: hash
      // })
      // if (!GamesHash) {
      //   throw new Error("Bet hash doesn't exist");
      // }

      // // update crashpoint
      // await GamesHash.updateOne({
      //   hash: hash
      // }, {
      //   crashpoint: crashpoint
      // });

      // iterate the users and update their balance
      for (let i = 0; i < users.length; i++) {
        // find the user
        const user = await User.findOne({
          _id: users[i]
        });

        // find the Bet
        const bet = await Bet.findOne({
          hash: hash,
          address: user.tokens[0].address
        });
        
        console.log(typeof Object(hash));
        console.log(bet);

        // updates
        bet.status = true;
        user.tokens[0].balance = user.tokens[0].balance + Bet.amount * crashpoint;

        // save
        await Bet.save();
        await user.save();
      }
    }
  }
};