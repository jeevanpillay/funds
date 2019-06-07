const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt/bcrypt");
const hdkey = require("./vechainhdkey");

// Vechain HDKey configurations
const mnemonic = hdkey.getMnemonic();
const seed = hdkey.createSeed(mnemonic);
const hdroot = hdkey.createRoot(seed);

// JSON Web Token configurations
const createToken = user => {
  const { username, email } = user;

  // create token
  var token = jwt.sign({ username, email }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
    // algorithm: "RS256"
  });

  // return
  return token;
};

exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      const user = await User.findOne({
        username: currentUser.username
      });
      // .populate({
      //     path: 'favorites',
      //     model: 'Recipe'
      // });
      return user;
    },

    getUsersAddress: async (root, args, { User }) => {
        return [
            "0x82f5488B078A1fBdFa959b944aBF3AA583f4109B",
            "0xf95cA4Bc8DAcBDd8045DDFD6CcB9ec06CFCf886E",
            "0xd76Fc92744BC85a63Fe4326F39707EEb03884b2C"
          ];
    }
  },

  Mutation: {
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      const privateKey = hdkey.derivePrivateKeyByIndex(
        hdroot,
        await User.countDocuments()
      );

      if (privateKey === null) {
          throw new Error("Issue with creating account!");
      }

      const newUser = await new User({
        username,
        email,
        password,
        privateKey: privateKey.toString('hex'),
        address: hdkey.PrivateKeyToAddress(privateKey).toString('hex')
      }).save();

      return { token: createToken(newUser) };
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Invalid Username");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      return { token: createToken(user) };
    }
  }
};
