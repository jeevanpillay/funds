const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt/bcrypt");
const hdkey = require("./models/blockchain/vechainhdkey");

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
    }
  },

  Mutation: {
    signupUser: async (
      root,
      { username, email, password },
      { User, Token }
    ) => {
      // check if user exists
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      // create private key
      const privateKey = hdkey.derivePrivateKeyByIndex(
        hdroot,
        await User.countDocuments()
      );

      // ensure pk exists
      if (privateKey === null) {
        throw new Error("Issue with creating account!");
      } else {
        // create token
        const vetToken = new Token({
          address: "0x" + hdkey.PrivateKeyToAddress(privateKey).toString("hex"),
          name: "VET",
          privateKey: "0x" + privateKey.toString("hex"),
          balance: 0
        });

        // create the user
        const newUser = new User({
          username,
          email,
          password
        });

        // insert vet token
        newUser.tokens.push(vetToken);
        await newUser.save();

        // create jwt
        return { token: createToken(newUser) };
      }
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
    },
  }
};
