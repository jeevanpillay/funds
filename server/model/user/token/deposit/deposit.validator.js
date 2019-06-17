const validate = require("mongoose-validator");

const amountValidator = [
  validate({
    validator: function(val) {
      return val > 0;
    },
    message: 'Amount must be more than 0.'
  })
];

const confirmationsValidator = [
  validate({
    validator: function(val) {
      return val >= 0;
    },
    message: 'Confirmations must be more than or equal to 0.'
  })
];

const addressValidator = [
    validate({
      validator: "isAlphanumeric",
      message: "Address should contain alpha-numeric characters only"
    })
  ];

module.exports = {
    amountValidator, 
    confirmationsValidator,
    addressValidator
};
