/**
 * Monitoring all address and send balances to the HOT wallet
 * --> https://ethereum.stackexchange.com/questions/18387/how-to-monitor-all-your-addresses-and-send-payments-out-immediately-to-a-main-ad
 *
 * Monitoring VET address for deposits.
 * --> https://ethereum.stackexchange.com/questions/27805/how-to-programmatically-detect-and-accept-eth-and-erc20-deposits
 * --> https://ethereum.stackexchange.com/questions/44981/how-to-watch-several-ethereum-addresses-for-transactions?noredirect=1&lq=1
 */

// imports
const User = require("../user/user");
const Deposit = require("../user/token/deposit/deposit");

// VechainHDKey functions
function VechainBlockchain() {}

// TODO: get rid of result and error
VechainBlockchain.createTransferSubscription = function(web3, addr) {
  // subscribe to the addresses for incoming vet transfers
  const subscription = web3.eth.subscribe(
    "transfers",
    {
      recipient: addr
    },
    (error, result) => {
      if (error) {
        console.log(error(error));
      }
    }
  );

  subscription.on("data", data => {
    const amount = data.amount;
    const from = data.sender;
    this.addNewDepositForUser(addr, amount, from);
  });

  return subscription;
};

VechainBlockchain.addNewDepositForUser = async function(toAddress, amount, fromAddress) {
  // error check
  const user = await User.findOne(
    { tokens: { $elemMatch: { _id: toAddress } } },
    { "tokens.$.balance": true }
  );
  if (!user) {
    new Error("Public address does not exist");
  }

  // create deposit
  const value = parseInt(amount.replace(/^#/, ""), 16);
  const balance = user.tokens[0].balance + value;
  var deposits = user.tokens[0].deposits;

  // create the deposit
  deposits.push(
    new Deposit({
      amount: value,
      address: fromAddress
    })
  );

  // update balance
  await User.updateOne(
    { tokens: { $elemMatch: { _id: toAddress } } },
    {
      $set: {
        "tokens.$.balance": balance,
        "tokens.$.deposits": deposits
      }
    }
  );
};

VechainBlockchain.createNewBlockHeaderSubscription = function(web3) {
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

VechainBlockchain.createWatchService = function(web3) {
  // Setup address
  let address = {};

  // Setup filters and options for the watch
  const pipeline = [
    {
      $match: {
        operationType: "insert"
      }
    }
  ];

  // Create a watch to ensure that new users data are added to the address variable
  User.watch(pipeline).on("change", data => {
    // destructure address
    const addr = data.fullDocument.address;

    // create subscription
    const subscription = VechainBlockchain.createTransferSubscription(
      web3,
      addr
    );

    // add to hash table
    if (!(addr in address)) address[addr] = subscription;

    console.log("The addresses", address);
  });

  return address;
};

VechainBlockchain.createWatchServiceFake = function(web3) {
  // configure address
  let addresses = [
    "0x82f5488b078a1fbdfa959b944abf3aa583f4109b",
    "0xf95ca4bc8dacbdd8045ddfd6ccb9ec06cfcf886e",
    "0xd76fc92744bc85a63fe4326f39707eeb03884b2c"
  ];

  let address = {};
  for (var addr of addresses) {
    address[addr] = VechainBlockchain.createTransferSubscription(web3, addr);
  }
};

module.exports = VechainBlockchain;
