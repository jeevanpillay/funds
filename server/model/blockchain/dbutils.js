// imports
const check = require("check-types");

// Mongoose models
const User = require("../user/user");
const Deposit = require("../user/token/deposit/deposit");

deposit = async (fromAddress, toAddress, amount, token) => {
    await getUser(toAddress, token);
    await createDeposit(fromAddress, toAddress, amount);
}

getUser = async (address, token, returns) => {
    // TODO: assertions for address, token, returns
    // get user
    let user = await User.findOne(
        { tokens: { $elemMatch: { _id: address, name: token } } },
        returns
    );

    // error check
    if (check.null(user)) throw new Error("User's tokens with that address doesn't exists");

    // return 
    return user;
}

getAddresses = async (token) => {
    // find all users based on token provided
    let users = await User.find(
        { tokens: { $elemMatch: { name: token } } },
        { "tokens._id": "1" }
    );

    // destructure addresses
    let addresses = [];
    for (let i=0; i<users.length; i++) {
        const addr = users[i].tokens[0]._id;
        addresses.push(addr);
    }

    // return
    return addresses;
}

createDeposit = async (fromAddress, toAddress, amount) => {
    // TODO: assertions for fromAddress, toAddress, amount
    // parse
    if (typeof amount == 'string')
        amount = parseInt(amount.replace(/^#/, ""), 16);

    // save deposit
    const deposit = new Deposit({
        fromAddress: fromAddress,
        toAddress: toAddress,
        amount: amount,
    }).save();

    // return
    return deposit;
}

module.exports = { deposit, getAddresses };