/**
 * Monitoring all address and send balances to the HOT wallet
 * --> https://ethereum.stackexchange.com/questions/18387/how-to-monitor-all-your-addresses-and-send-payments-out-immediately-to-a-main-ad
 *
 * Monitoring VET address for deposits.
 * --> https://ethereum.stackexchange.com/questions/27805/how-to-programmatically-detect-and-accept-eth-and-erc20-deposits
 * --> https://ethereum.stackexchange.com/questions/44981/how-to-watch-several-ethereum-addresses-for-transactions?noredirect=1&lq=1
 */
// imports
const { deposit, getAddresses } = require("./dbutils");

// TODO: get rid of result and error
createTransferSubscription = function(web3, addr, token) {
  // subscribe to the addresses for incoming vet transfers
  const subscription = web3.eth.subscribe("transfers", { recipient: addr }, (error, result) => {
      if (error) console.err(err);
    }
  );

  subscription.on("data", ({ amount, sender }) => {
   deposit(sender, addr, amount, token);
   console.log("New deposit for ", addr)
  });

  return subscription;
};

createNewBlockHeaderSubscription = function(web3) {
  // initial setup
  let address = [
    "0x82f5488b078a1fbdfa959b944abf3aa583f4109b",
    "0xf95ca4bc8dacbdd8045ddfd6ccb9ec06cfcf886e",
    "0xd76fc92744bc85a63fe4326f39707eeb03884b2c"
  ];

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

createWatchService = async function(web3, token) {
  // get all users with their addresses
  let addresses = await getAddresses(token);

  // create transfer subscription service for the addresses
  for (var addr of addresses) {
    createTransferSubscription(web3, addr, token)
  }
};

module.exports = createWatchService;
