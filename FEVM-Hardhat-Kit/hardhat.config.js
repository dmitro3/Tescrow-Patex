require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "./.env" });
const patexSepoliaUrl = process.env.PATEX_SEPOLIA_URL
console.log('privet key ------',process.env.MNEMONIC);
module.exports = {
  solidity: "0.8.1",
  defaultNetwork: 'hardhat',
  networks: {
    "patex-sepolia": {
      url: patexSepoliaUrl,
      accounts: { mnemonic: process.env.MNEMONIC }
   }    
  },
};