const validate = require("mongoose-validator/lib/mongoose-validator");

const amountValidator = [
  validate({
    validator: function(val) {
      return val > 0;
    },
    message: 'Bet must be more than 0.'
  })
];

const multiplierValidator = [
  validate({
    validator: function(val) {
      return val >= 0;
    },
    message: 'Value must be more than or equal to 0.'
  })
];

module.exports = {
    amountValidator,
    multiplierValidator
};
