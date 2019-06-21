const { deposit, getAllUsersAddress, updateDeposit } = require("../../utils/dbutils");
const check = require('check-types');

createBlockWatchService = async function (web3, token) {
    // get all users with their addresses
    let addresses = await getAllUsersAddress(token);

    // Create block header subscription
    const subscription = web3.eth.subscribe("newBlockHeaders");

    // Subscription service on receive data
    subscription.on("data",({
        transactions,
    }) => {
        for (var tx of transactions)
            createTransaction(web3, tx, addresses, token);
    });
};

checkDepositsContainer = function (depositsContainer, deposits) {
    if (check.greaterOrEqual(depositsContainer, 13)) throw new Error("There was an issue with the deposit container!");

    // continually push to container if first 12 items
    if (depositsContainer.length < 13) {
        depositsContainer.push(deposits);
    } else {
        // iterate deposits in position 0 and update users balance
        for (var deposit of depositsContainer[0]) {
            updateDeposit(deposit._id);
        }

        // remove item 0
        depositsContainer.splice(0);
    }
}

createTransaction = function (web3, tx, addresses, token) {
    web3.eth.getTransaction(tx)
        .then(({
            clauses,
            origin
        }) => {
            // create the deposits from the clauses
            for (var clause of clauses)
                createClause(addresses, clause, token, origin);
        })
        .catch(err => console.error(err));
}

createClause = async function (addresses, clause, token, sender) {
    // destructure
    const { to, value } = clause;
    
    // check if the address exists and then create a deposit
    if (addresses.includes(to)) {
        var d = await deposit(sender, to, value, token);
        console.log("Block: New deposit for", to)
        return d;
    } else {
        return null;
    }
}

module.exports = createBlockWatchService;
