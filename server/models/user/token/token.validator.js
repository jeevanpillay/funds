const validate = require("mongoose-validator");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3],
    message: "Token name should be {ARGS[0]} characters"
  })
];

const balanceValidator = [
  validate({
    validator: function(val) {
      return val >= 0;
    },
    message: 'Balance must be more than or equal to 0.'
  })
];

const addressValidator = [
  validate({
    validator: "isAlphanumeric",
    message: "Address should contain alpha-numeric characters only"
  })
];
module.exports = {
  nameValidator,
  balanceValidator,
  addressValidator
};
