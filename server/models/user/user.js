const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt/bcrypt");
const {
  nameValidator,
  emailValidator,
  passwordValidator,
  keyValidator
} = require("./user.validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: nameValidator
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator
  },
  joinDate: {
    type: Date,
    default: Date.now()
  },
  privateKey: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  tokens: {
    type: [String],
    ref: "Token"
  },
//   investment: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: "Investment"
//   }
});

UserSchema.pre("save", function(next) {
  // ensure pre save is only called when password is modified
  if (!this.isModified("password")) {
    return next();
  }

  // hash the password and call next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);