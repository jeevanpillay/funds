// Merge
const merge = require('lodash').merge;

// Resolvers
const user = require('./user/user.resolvers').resolvers;
const withdrawal = require('./user/token/withdrawal/withdrawal.resolvers').resolvers;
const deposit = require('./user/token/deposit/deposit.resolvers').resolvers;

// Export
module.exports = merge(user, withdrawal, deposit);
