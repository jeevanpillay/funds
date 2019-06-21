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
  // TODO: get rid of result and error

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

createBlockWatchService = function(web3) {
  // Setup subscription
  const subscription = web3.eth
    .subscribe("newBlockHeaders", function(error, result) {
      if (!error) {
        return;
      }
    })
    .on("data", function(blockHeader) {
      // get block number
      const blockNumber = blockHeader.number;
      // find the block
      web3.eth
        .getBlock(blockNumber)
        .then(blockRes => {
          // destructure transactions
          const transactions = blockRes.transactions;
          // iterate the transactions if there are transaction in the block
          if (transactions) {
            for (var tx of transactions) {
              web3.eth
                .getTransaction(tx)
                .then(txRes => {
                  // get the clauses
                  const clauses = txRes.clauses;
                  if (clauses) {
                    for (var clause of clauses) {
                      const addr = clause.to;
                      const value = clause.value;
                      if (address.includes(addr)) {
                        this.updateDatabaseUserBalance(addr, value);
                      }
                    }
                  }
                })
                .catch(err => console.log(err));
            }
          }
        })
        .catch(err => console.log(err));
    })
    .on("error", console.error);
};

module.exports = { createTransferWatchService, createBlockWatchService };
