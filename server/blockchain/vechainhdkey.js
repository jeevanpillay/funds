/*
References for VechainHDKey:
Thor-devkit's cry: https://github.com/vechain/thor-devkit.js/blob/master/src/cry/mnemonic.ts
BIP39
HDKey
Ethereum HDKey: https://github.com/ethereumjs/ethereumjs-wallet/blob/01382b1e5631f2e4c73ee5ac9e94e8a8af0d4907/hdkey.js

Notes:
Medium Guide: https://medium.com/@harshagoli/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998
Vechain Wallet Information: https://github.com/vechain/thor-client-sdk4j
*/

// Imports
const { cry } = require("thor-devkit");
const HDKey = require("hdkey");
const BIP39 = require("bip39");

// Constants
const VET_DERIVATION_PATH = `m/44'/818'/0'/0`;

// VechainHDKey functions
function VechainHDKey() { }

VechainHDKey.createMnemonic = function () {
  return cry.mnemonic.generate();
};

VechainHDKey.getMnemonic = function () {
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

VechainHDKey.createSeed = function (mnemonicBuffer) {
  return BIP39.mnemonicToSeedSync(mnemonicBuffer.join(" "));
};

VechainHDKey.createRoot = function (seedBuffer) {
  return HDKey.fromMasterSeed(seedBuffer);
};

VechainHDKey.createMasterPrivateKey = function (root) {
  return root.privateKey;
};

VechainHDKey.derivePrivateKeyByIndex = function (root, index) {
  if (index === null) {
    return null;
  }

  return root.derive(VET_DERIVATION_PATH + "/" + index).privateKey;
};

VechainHDKey.derivePublicKeyByPrivateKey = function (privateKey) {
  return cry.secp256k1.derivePublicKey(privateKey);
};

VechainHDKey.PublicKeyToAddress = function (publicKey) {
  return cry.publicKeyToAddress(publicKey);
};

VechainHDKey.PrivateKeyToAddress = function (privateKey) {
  return cry
    .publicKeyToAddress(
      cry.secp256k1.derivePublicKey(privateKey)
    )
};

module.exports = VechainHDKey;
