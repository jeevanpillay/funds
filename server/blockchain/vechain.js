// imports
const User = require("../models/User");

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
    const value = parseInt(amount.replace(/^#/, ""), 16);
    this.updateDatabaseUserBalance(addr, value);
  });

  return subscription;
};

VechainBlockchain.updateDatabaseUserBalance = async function(addr, value) {
  // error check
  const user = await User.findOne({ address: addr });
  if (!user) {
    throw new Error("Public address does not exist");
  }

  // update
  await User.updateOne(
    {
      address: addr
    },
    {
      balance: user.balance + value
    }
  );
};

VechainBlockchain.createNewBlockHeaderSubscription = function() {
  // // Setup subscription
  // const subscription = web3.eth
  //   .subscribe("newBlockHeaders", function(error, result) {
  //     if (!error) {
  //       return;
  //     }
  //   })
  //   .on("data", function(blockHeader) {
  //     // get block number
  //     const blockNumber = blockHeader.number;
  //     // find the block
  //     web3.eth.getBlock(blockNumber).then(blockRes => {
  //       // destructure transactions
  //       const transactions = blockRes.transactions;
  //       // iterate the transactions if there are transaction in the block
  //       if (transactions) {
  //         for (var tx of transactions) {
  //           web3.eth
  //             .getTransaction(tx)
  //             .then(txRes => {
  //               // get the clauses
  //               const clauses = txRes.clauses;
  //               if (clauses) {
  //                 for (var clause of clauses) {
  //                   const add = clause.to;
  //                   if (addr.includes(add)) {
  //                     console.log('works?');
  //                   }
  //                   // if (address[clause.to]) {
  //                   //   console.log('yes');
  //                   //   // User.updateOne(
  //                   //   //   {
  //                   //   //     _id: address[clause.to]
  //                   //   //   },
  //                   //   //   {
  //                   //   //     balance: 1
  //                   //   //   }
  //                   //   // );
  //                   // }
  //                 }
  //               }
  //             })
  //             .catch(err => console.log(error(err)));
  //         }
  //       }
  //     }).catch(err => console.log(error(err)));
  //   })
  //   .on("error", console.error);
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

    let address = {}
    for (var addr of addresses) {
        address[addr] = VechainBlockchain.createTransferSubscription(web3, addr);
    }
}

module.exports = VechainBlockchain;
