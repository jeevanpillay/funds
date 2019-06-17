const validate = require("mongoose-validator");

const amountValidator = [
  validate({
    validator: function(val) {
      return val > 0;
    },
    message: 'Value must be more than 0.'
  })
];

module.exports = {
    amountValidator
};
