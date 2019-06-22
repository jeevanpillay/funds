const { createIncomingDeposit, getAllUsersAddress, updateExistingDeposits } = require("../../utils/dbutils");

createBlockWatchService = async function (web3, token, confirmation) {
    // get all users with their addresses
    let addresses = await getAllUsersAddress(token);
    
    // Create block header subscription
    const subscription = web3.eth.subscribe("newBlockHeaders");

    // Subscription service on receive data
    subscription.on("data",({
        transactions,
        number,
    }) => {
        // wait for 12 confirmations before updating
        updateExistingDeposits(number - confirmation, token);

        // iterate tx to create new deposits
        for (var tx of transactions)
            createTransaction(web3, tx, addresses, token, number);
    });
};

createTransaction = function (web3, tx, addresses, token, blockNumber) {
    web3.eth.getTransaction(tx)
        .then(({
            clauses,
            origin,
            id
        }) => {
            // create the deposits from the clauses
            for (var clause of clauses)
                createClause(addresses, clause, token, origin, id, blockNumber);
        })
        .catch(err => console.error(err));
}

createClause = async function (addresses, clause, token, sender, txid, blockNumber) {
    // destructure
    const { to, value } = clause;
    
    // check if the address exists and then create a deposit
    if (addresses.includes(to)) {
        // TODO: change to float format
        const amount = parseInt(value, 10)/1e18;
        await createIncomingDeposit(sender, to, amount, token, txid, blockNumber);
    }
}

module.exports = createBlockWatchService;
