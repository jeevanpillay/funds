exports.resolvers = {
  Query: {
    getUserDeposits: async (root, { username, address }, { User }) => {
      // error check
      const user = await User.findOne({
        username,
        tokens: { $elemMatch: { _id: address } }
      });
      if (!user) {
        new Error("User with that address doesn't exists");
      }

      // get the withdrawals
      const deposits = user.tokens[0].deposits;
      return deposits;
    }
  }
};
