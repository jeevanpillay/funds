// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt/bcrypt");

// validation
const {
  nameValidator,
  emailValidator,
  passwordValidator,
} = require("./user.validator");

// schemas
const Token = require("./token/token").Schema;

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
  tokens: {
    type: [Token]
  }
});

// Validator middleware
UserSchema.pre("save", function (next) {
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

// exports
module.exports = mongoose.model("User", UserSchema);