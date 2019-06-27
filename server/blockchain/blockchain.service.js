module.exports = class BlockchainService {
    constructor(web3, confirmations, token, name) {
        if (new.target === BlockchainService) throw new TypeError("Cannot construct Abstract instances directly");
        if (web3 === null) throw new Error("The web3 instance is missing")
        if (confirmations === null) throw new Error("Number of confirmations is missing")
        if (token === null) throw new Error("Token abbrevation is missing")

        this._token = token;
        this._name = name;
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
    setupWallets() {};
    createTransactions() {};
}