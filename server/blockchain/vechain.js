// imports
const User = require("../models/User");

// VechainHDKey functions
function VechainBlockchain() { }

// TODO: get rid of result and error
VechainBlockchain.createTransferSubscription = function (web3, addr) {
    // subscribe to the addresses for incoming vet transfers
    const subscription = web3.eth.subscribe(
        "transfers",
        {
            recipient: addr
        },
        (error, result) => {
            if (error) {
                console.log(error(error));
            } else {
                console.log(result);
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

VechainBlockchain.updateDatabaseUserBalance = async function (addr, value) {
    const user = await User.findOne({ address: addr });
    if (!user) {
      throw new Error("Public address does not exist");
    }

    console.log("address", addr);
    console.log("balance", value);

    await User.updateOne(
        {
            address: addr
        },
        {
            balance: user.balance + value
        }
    );
};

VechainBlockchain.createNewBlockHeaderSubscription = function () {
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

module.exports = VechainBlockchain;
