// Merge
const merge = require('lodash').merge;

// Resolvers
const user = require('./models/user/user.resolvers').resolvers;
const withdrawal = require('./models/user/token/withdrawal/withdrawal.resolvers').resolvers;
const deposit = require('./models/user/token/deposit/deposit.resolvers').resolvers;

// Export
module.exports = merge(user, withdrawal, deposit);
