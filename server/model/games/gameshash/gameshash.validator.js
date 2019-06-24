const validate = require("mongoose-validator/lib/mongoose-validator");

const crashValidator = [
  validate({
    validator: function(val) {
      return val >= 0;
    },
    message: 'Crash point must be more than or equal to 0.'
  })
];

module.exports = {
  crashValidator
};
