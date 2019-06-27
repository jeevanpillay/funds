module.exports = class BlockchainService {
    constructor(web3, confirmations) {
        if (new.target === BlockchainService) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this._web3Instance = web3;
        this._confirmations = confirmations
    }

    get web3() {
        return this._web3Instance;
    }

    get confirmation() {
        return this._confirmations;
    }

    createBlockWatchService() {};
}