const mongoose = require('mongoose');

exports.resolvers = {
  Query: {
    getUserGames: async (root, {
      username,
      address
    }, {
      User,
      Game
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
        new Error("User with that address doesn't exists");
      }

      // get all games
      return await Game.find({
        address: address
      })
    }
  },
  Mutation: {
    createGame: async (root, {
      username,
      address,
      bet,
      hash,
      multiplier
    }, {
      User,
      Game
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
        new Error("User with that address doesn't exists");
      }

      // create withdrawl
      const balance = user.tokens[0].balance - bet;

      // create the game
      const game = await new Game({
        bet: bet,
        multiplier: multiplier,
        hash: new mongoose.Types.ObjectId,
        address: address
      }).save();

      // add the game to the user
      let games = user.tokens[0].games;
      games.push(game._id);

      // update balance
      await User.updateOne({
        tokens: {
          $elemMatch: {
            _id: address
          }
        }
      }, {
        $set: {
          "tokens.$.balance": balance,
          "tokens.$.games": games
        }
      });

      return true;
    }
  }
};