module.exports = class BlockchainService {
    constructor(web3, confirmations) {
        if (new.target === BlockchainService) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this._web3Instance = web3;
        this._confirmations = confirmations;
        this._wallets = {};
    }

    get token() {
        return this._token;
    }

    get wallets() {
        return this._wallets;
    }

    get web3() {
        return this._web3Instance;
    }

    get confirmation() {
        return this._confirmations;
    }

    addWallet(wallet) {
        this.wallets[wallet.address] = wallet.privateKey;
    }

    setupBlockWatchService() {};
    createTransactions() {};
    setupWallets() {};
}