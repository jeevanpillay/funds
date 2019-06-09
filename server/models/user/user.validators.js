const validate = require("mongoose-validator");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [4, 15],
    message: "Username should be between {ARGS[0]} and {ARGS[1]} characters"
  }),
  validate({
    validator: "isAlphanumeric",
    message: 'Username should contain alpha-numeric characters only',
})
];

const emailValidator = [
  validate({
    validator: "isEmail",
    message: "Email is not in the default email format"
  })
];

const passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [6, 50],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters"
  })
];

module.exports = {
    passwordValidator,
    emailValidator,
    nameValidator
}
