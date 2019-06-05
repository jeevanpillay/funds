const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
        getAllRecipes: async (root, args, { Recipe }) => { 
            return await Recipe.find();
        }
    },

    Mutation: {
        addRecipe: async (root, { name, description, category,instructions, username }, { Recipe }) => {
            const r = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();

            return r;
        },

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