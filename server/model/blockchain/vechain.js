// imports
const { deposit, getAllUsersAddress } = require("./dbutils");

createTransferWatchService = async function(web3, token) {
  // get all users with their addresses
  let addresses = await getAllUsersAddress(token);

  // create transfer subscription service for the addresses
  for (var addr of addresses) {
    createTransferSubscription(web3, addr, token)
  }
};

createTransferSubscription = function(web3, addr, token) {
  // TODO: get rid of callback
  // subscribe to the addresses for incoming vet transfers
  const subscription = web3.eth.subscribe("transfers", { recipient: addr }, (error, result) => {
      if (error) console.err(err);
    }
  );

  subscription.on("data", ({ amount, sender }) => {
   deposit(sender, addr, amount, token);
   console.log("New deposit for", addr)
  });

  return subscription;
};

createTransaction = function(web3, tx, addresses, token) {
  web3.eth.getTransaction(tx)
    .then(({clauses, origin}) => {
      for (var clause of clauses)
        createClause(addresses, clause, token, origin)
    })
    .catch(err => console.error(err));
}

createClause = function(addresses, clause, token, sender) {
  const addr = clause.to;
  const amount = clause.value;
  if (addresses.includes(addr)) {
    deposit(sender, addr, amount, token);
    console.log("New deposit for", addr)
  }
}

createBlockWatchService = async function(web3, token) {
  // get all users with their addresses
  let addresses = await getAllUsersAddress(token);

  // Create block header subscription
  const subscription = web3.eth.subscribe("newBlockHeaders");

  // Subscription service on receive data
  subscription.on("data", ({transactions}) => {
    for (var tx of transactions)
      createTransaction(web3, tx, addresses, token);
  });
};

module.exports = { createTransferWatchService, createBlockWatchService };
