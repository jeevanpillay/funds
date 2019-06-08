// imports
const VechainBlockchain = require("./vechain");

function FakeVechainSubscription() {}
FakeVechainSubscription.buildFakeSubscriptions = function(web3) {
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
module.exports = FakeVechainSubscription;