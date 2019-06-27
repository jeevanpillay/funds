// imports
const check = require("check-types/src/check-types");

// Mongoose models
const User = require("../model/user/user");
const Deposit = require("../model/user/token/deposit/deposit");

createIncomingDeposit = async (fromAddress, toAddress, amount, token, txid, blockNumber) => {
    // check user
    await getUserByAddress(toAddress, token);

    // create the deposit
    return await createDeposit(fromAddress, toAddress, amount, txid, blockNumber);
}

getUserByAddress = async (address, token, returns) => {
    // TODO: assertions for address, token, returns
    // get user
    let user = await User.findOne({
            tokens: {
                $elemMatch: {
                    _id: address,
                    name: token
                }
            }
        },
        returns
    );

    // error check
    if (check.null(user)) throw new Error("User's tokens with that address doesn't exists");

    // return 
    return user;
}

getAllUsersAddress = async (token) => {
    // find all users based on token provided
    let users = await User.find({
        tokens: {
            $elemMatch: {
                name: token
            }
        }
    }, {
        "tokens._id": 1,
        "tokens.privateKey": 1
    });

    // destructure addresses
    let wallets = [];
    for (let i = 0; i < users.length; i++) {
        const addr = users[i].tokens[0]._id;
        const privateKey = users[i].tokens[0].privateKey;
        wallets.push({
            address: addr,
            privateKey: privateKey
        });
    }

    // return
    return wallets;
}

createDeposit = async (fromAddress, toAddress, amount, txid, blockNumber) => {
    // TODO: assertions for fromAddress, toAddress, amount
    // save deposit
    const deposit = await new Deposit({
        fromAddress: fromAddress,
        toAddress: toAddress,
        amount: amount,
        txid: txid,
        blockNumber: blockNumber
    }).save();

    // return
    return deposit;
}

updateUsersDeposit = async (address, amount, token) => {
    // todo: assert amount
    // get the user
    const user = await getUserByAddress(address, token);

    // update balance
    await User.updateOne({
        tokens: {
            $elemMatch: {
                _id: address,
                name: token
            }
        }
    }, {
        $set: {
            "tokens.$.balance": user.tokens[0].balance + amount,
        }
    })
    .then(() => {
        console.log("Successfully updated user %s's token (%s) balance by %d", user._id, token, amount)
    })
    .catch((err) => {
        throw new Error("Error updating the user's token balance");
    });
}

updateExistingDeposits = async (blockNumber, token) => {
    // todo: assert block number
    // find deposit and update
    let deposits = await Deposit.find({
        blockNumber: blockNumber
    });

    for (var deposit of deposits) {
        try {
            deposit.confirmation = true;
            await deposit.save()
            .then(async () => {
                await updateUsersDeposit(deposit.toAddress, deposit.amount, token)
            })
        } catch (err) {
            console.log(err);
        }
    }

    // return
    return deposits;
}

module.exports = {
    createIncomingDeposit,
    getAllUsersAddress,
    updateExistingDeposits
};