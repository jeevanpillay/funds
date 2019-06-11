const merge = require('lodash').merge;

const UserResolvers = require('./models/user/user.resolvers').resolvers;
const WithdrawalResolvers = require('./models/user/token/withdrawal/withdrawal.resolvers').resolvers;
const DepositResolvers = require('./models/user/token/deposit/deposit.resolvers').resolvers;

exports.resolvers = merge(UserResolvers, WithdrawalResolvers, DepositResolvers);
