const { deposit, getAllUsersAddress } = require("../../utils/dbutils");

createBlockWatchService = async function (web3, token) {
    // get all users with their addresses
    let addresses = await getAllUsersAddress(token);

    // Create block header subscription
    const subscription = web3.eth.subscribe("newBlockHeaders");

    // Subscription service on receive data
    subscription.on("data", ({
        transactions
    }) => {
        for (var tx of transactions)
            createTransaction(web3, tx, addresses, token);
    });
};

createTransaction = function (web3, tx, addresses, token) {
    web3.eth.getTransaction(tx)
        .then(({
            clauses,
            origin
        }) => {
            for (var clause of clauses)
                createClause(addresses, clause, token, origin)
        })
        .catch(err => console.error(err));
}

createClause = function (addresses, clause, token, sender) {
    const addr = clause.to;
    const amount = clause.value;
    if (addresses.includes(addr)) {
        deposit(sender, addr, amount, token);
        console.log("Block: New deposit for", addr)
    }
}

module.exports = createBlockWatchService;
