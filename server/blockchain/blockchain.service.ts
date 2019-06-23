const Web3 = require('web3');
const { createIncomingDeposit, getAllUsersAddress, updateExistingDeposits } = require("../../utils/dbutils");

abstract class BlockchainService implements TransactionWatchService {
    web3Instance: any;
    token: string;
    confirmations: number;
    addresses: any;

    constructor(web3, token, confirmations) {
        this.web3Instance = web3;
        this.token = token;
        this.confirmations = confirmations
    }

    abstract createBlockWatchService = async () => {};
    abstract createTransferWatchService = async () => {};
}