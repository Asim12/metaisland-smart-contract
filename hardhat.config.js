require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
module.exports = {
  defaultNetwork: "mainnet",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545"
    },
    hardhat: {
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: ["1d1d351f19e633d1db52572d3adc14a119c425b8652a82bd70ba05937e7a2e0e"]//{mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: ["1d1d351f19e633d1db52572d3adc14a119c425b8652a82bd70ba05937e7a2e0e"]//{smnemonic: mnemonic}
    }
  },
    etherscan: {
      apiKey: {
        bscTestnet: 'XBYQVS8AFZTKC2B187XTNP7UQN3KDH5APD'
      }
    },

  solidity: {
  version: "0.8.7",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
