require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const AVALANCHE_LOCAL_PRIVATE_KEY = process.env.AVALANCHE_LOCAL_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    avalancheLocal: {
      url: "http://127.0.0.1:9650/ext/bc/LIFENetwork/rpc",
      accounts: [AVALANCHE_LOCAL_PRIVATE_KEY],
      chainId: 9999
    }
  },
};
