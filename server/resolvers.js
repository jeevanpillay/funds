// Merge
const merge = require('lodash').merge;

// Resolvers
const UserResolvers = require('./models/user/user.resolvers').resolvers;
const WithdrawalResolvers = require('./models/user/token/withdrawal/withdrawal.resolvers').resolvers;
const DepositResolvers = require('./models/user/token/deposit/deposit.resolvers').resolvers;

// Export
module.exports = merge(UserResolvers, WithdrawalResolvers, DepositResolvers);
