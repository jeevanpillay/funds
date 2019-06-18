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
        throw new Error("User with that address doesn't exists");
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
      const balance = user.tokens[0].balance - bet;
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
    },

    endGame: async (root, {
      hash,
      users,
      crashpoint
    }, {
      User,
      Game,
      GameHash
    }) => {
      // error checker
      // const gameHash = await GameHash({
      //   hash: hash
      // })
      // if (!gameHash) {
      //   throw new Error("Game hash doesn't exist");
      // }

      // // update crashpoint
      // await GameHash.updateOne({
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

        // find the game
        const game = await Game.findOne({
          hash: hash,
          address: user.tokens[0].address
        });
        
        console.log(typeof Object(hash));
        console.log(game);

        // updates
        game.status = true;
        user.tokens[0].balance = user.tokens[0].balance + game.bet * crashpoint;

        // save
        await game.save();
        await user.save();
      }
    }
  }
};