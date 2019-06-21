const { deposit, getAllUsersAddress } = require("../../utils/dbutils");

createTransferWatchService = async function (web3, token) {
    // get all users with their addresses
    let addresses = await getAllUsersAddress(token);

    // create transfer subscription service for the addresses
    for (var addr of addresses) {
        createTransferSubscription(web3, addr, token)
    }
};

createTransferSubscription = function (web3, addr, token) {
    // TODO: get rid of callback
    // subscribe to the addresses for incoming vet transfers
    const subscription = web3.eth.subscribe("transfers", {
        recipient: addr
    }, (error, result) => {
        if (error) console.err(err);
    });

    subscription.on("data", ({
        amount,
        sender
    }) => {
        deposit(sender, addr, amount, token);
        console.log("Transfer: New deposit for", addr)
    });

    return subscription;
};

module.exports = createTransferWatchService;
