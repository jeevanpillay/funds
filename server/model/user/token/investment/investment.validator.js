const validate = require("mongoose-validator/lib/mongoose-validator");

const amountValidator = [
    validate({
        validator: function (val) {
            return val >= 0;
        },
        message: 'Amount must be more than or equal to 0.'
    })
];

module.exports = {
    amountValidator
};