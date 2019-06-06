const {
  cry
} = require("thor-devkit");
const HDKey = require("hdkey");
const BIP39 = require("bip39");
const VET_DERIVATION_PATH = `m/44'/818'/0'/0`;

function VechainHDKey() {}

VechainHDKey.createMnemonic = function() {
  return cry.mnemonic.generate();
};

VechainHDKey.getMnemonic = function() {
  return [
    "light",
    "room",
    "celery",
    "write",
    "submit",
    "burst",
    "wrong",
    "balance",
    "zone",
    "swear",
    "obtain",
    "mention"
  ];
};

VechainHDKey.createSeed = function(mnemonicBuffer) {
  return BIP39.mnemonicToSeedSync(mnemonicBuffer.join(" "));
};

VechainHDKey.createRoot = function(seedBuffer) {
  return HDKey.fromMasterSeed(seedBuffer);
};

VechainHDKey.createMasterPrivateKey = function(root) {
  return root.privateKey.toString("hex");
};

VechainHDKey.derivePrivateKeyByIndex = function(root, index) {
  return root.derive(VET_DERIVATION_PATH + '/' + index).privateKey.toString("hex");
}

module.exports = VechainHDKey;
