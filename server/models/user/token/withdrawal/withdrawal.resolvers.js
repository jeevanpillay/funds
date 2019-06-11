exports.resolvers = {
  Query: {
    getUserWithdrawals: async (root, { username, address }, { User }) => {
      // error check
      const user = await User.findOne({
        username,
        tokens: { $elemMatch: { _id: address } }
      });
      if (!user) {
        new Error("User with that address doesn't exists");
      }

      // get the withdrawals
      const withdrawals = user.tokens[0].withdrawals;
      return withdrawals;
    }
  },
  Mutation: {
    withdrawFunds: async (
      root,
      { username, addressFrom, addressTo, amount },
      { User, Withdrawal }
    ) => {
      // error check
      const user = await User.findOne(
        {
          username,
          tokens: { $elemMatch: { _id: addressFrom } }
        },
        { "tokens.$.balance": true }
      );
      if (!user) {
        new Error("User with that address doesn't exists");
      }

      // create withdrawl
      const balance = user.tokens[0].balance - amount;
      var withdrawals = user.tokens[0].withdrawals;
      withdrawals.push(
        new Withdrawal({
          amount: amount,
          address: addressTo
        })
      );

      // update balance
      await User.updateOne(
        {
          tokens: { $elemMatch: { _id: addressFrom } }
        },
        {
          $set: {
            "tokens.$.balance": balance,
            "tokens.$.withdrawals": withdrawals
          }
        }
      );

      return true;
    }
  }
};
