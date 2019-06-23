export default class VechainService extends BlockchainService {
    constructor(web3: any, token: string, confirmations: number) {
        super(web3, token, confirmations);
    }

    createBlockWatchService = async () => {
        // get all users with their addresses
        this.addresses = await getAllUsersAddress(this.token);

        // Create block header subscription
        const subscription = this.web3Instance.eth.subscribe("newBlockHeaders");

        // Subscription service on receive data
        subscription.on("data", ({
            transactions,
            number,
        }) => {
            // wait for 12 confirmations before updating
            updateExistingDeposits(number - this.confirmations, this.token);

            // iterate tx to create new deposits
            for (var tx of transactions)
                this.createTransaction(tx, number);
        });

        console.log("Connection to vechain service has been established, watching blocks");
    }

    createTransaction = (tx: string, blockNumber: number) => {
        this.web3Instance.eth.getTransaction(tx)
            .then(({
                clauses,
                origin,
                id
            }) => {
                // create the deposits from the clauses
                for (var clause of clauses)
                    this.createClause(clause, origin, id, blockNumber);
            })
            .catch(err => console.error(err));
    }

    createClause = async (clause: any, sender: string, txid: string, blockNumber: number) => {
        // destructure
        const { to, value } = clause;

        // check if the address exists and then create a deposit
        if (this.addresses.includes(to)) {
            // TODO: change to float format
            const amount = parseInt(value, 10) / 1e18;
            await createIncomingDeposit(sender, to, amount, this.token, txid, blockNumber);
        }
    }

    createTransferWatchService = async () => {
        // get all users with their addresses
        this.addresses = await getAllUsersAddress(this.token);

        // create transfer subscription service for the addresses
        for (var addr of this.addresses) {
            this.createTransferSubscription(addr)
        }
    }

    createTransferSubscription = (addr: string) => {
        // TODO: get rid of callback
        // subscribe to the addresses for incoming vet transfers
        const subscription = this.web3Instance.eth.subscribe("transfers", {
            recipient: addr
        }, (error, result) => {
            if (error) console.error(error);
        });

        subscription.on("data", ({
            amount,
            sender
        }) => {
            createIncomingDeposit(sender, addr, amount, this.token);
            console.log("Transfer: New deposit for", addr)
        });

        return subscription;
    }
}