const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt/bcrypt");
const hdkey = require('./vechainhdkey');

// Vechain HDKey configurations
const mnemonic = hdkey.getMnemonic();
const seed = hdkey.createSeed(mnemonic);
const root = hdkey.createRoot(seed);
const masterPrivateKey = hdkey.createMasterPrivateKey(root);

// JSON Web Token configurations
const createToken = user => {
  const { username, email } = user;

  // create token
  var token = jwt.sign({ username, email }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
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
            })
            // .populate({
            //     path: 'favorites',
            //     model: 'Recipe'
            // });
            return user;
          },
    },

    Mutation: {
        signupUser: async(root, { username, email, password }, { User }) => {
            const user = await User.findOne({username});
            if (user) {
                throw new Error("User already exists");
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser)}
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