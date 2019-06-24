const BlockchainService = require("../blockchain.service");

module.exports = class VechainService extends BlockchainService {
    constructor(web3, confirmations) {
        super(web3, confirmations);
        this._tokens = {
            "VET": [],
            "SHA": [],
            "PLA": []
        }

        this.createBlockWatchService("VET");
    }

    get tokens() {
        return this._tokens;
    }

    setTokenAddresses(name, addresses) {
        this.tokens[name] = addresses;
    }

    async createBlockWatchService(name) {
        // get all users with their addresses
        this.setTokenAddresses(name, await getAllUsersAddress(name));
        
        // Create block header subscription
        const subscription = this.web3.eth.subscribe("newBlockHeaders");

        // Subscription service on receive data
        subscription.on("data", ({
            transactions,
            number,
        }) => {
            // wait for 12 confirmations before updating
            updateExistingDeposits(number - this.confirmation, name);

            // iterate tx to create new deposits
            for (var tx of transactions)
                this.createTransaction(tx, number, name);
        });

        console.log("Connection to vechain service has been established, watching blocks");
    }

    createTransaction(tx, blockNumber, name) {
        this.web3.eth.getTransaction(tx)
            .then(({
                clauses,
                origin,
                id
            }) => {
                // create the deposits from the clauses
                for (var clause of clauses)
                    this.createClause(clause, origin, id, blockNumber, name);
            })
            .catch(err => console.error(err));
    }

    createClause(clause, sender, txid, blockNumber, name) {
        // destructure
        const { to, value } = clause;

        // check if the address exists and then create a deposit
        if (this.tokens[name].includes(to)) {
            const amount = parseFloat(value, 10) / 1e18;
            createIncomingDeposit(sender, to, amount, name, txid, blockNumber);
        }
    }
}