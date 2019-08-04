const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic =
  "frost toast island december combine recipe friend bring jungle skin cloth rate";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      provider: "https://testnet2.matic.network"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/abb9d23bcaa6458e81b2adb42466df00"
        );
      },
      network_id: 3
    }
  }
};
