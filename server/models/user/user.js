const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt/bcrypt");
const { nameValidator, emailValidator, passwordValidator, keyValidator } = require('./user.validators');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    validate: emailValidator
  },
  joinDate: {
    type: Date,
    default: Date.now()
  },
  privateKey: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

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
