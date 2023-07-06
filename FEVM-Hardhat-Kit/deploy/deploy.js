const hre = require("hardhat");

async function main() {

  const TescrowDev = await hre.ethers.getContractFactory("TescrowDev");
  const tescrowDevs = await TescrowDev.deploy();

  await tescrowDevs.deployed();
  console.log('TescrowDevsNFT deployed to:', tescrowDevs.address);



  const AuctionEscrow = await hre.ethers.getContractFactory("Auction");
  const auctionEscrow = await AuctionEscrow.deploy(tescrowDevs.address);

  await auctionEscrow.deployed();
  console.log('AuctionEscrow deployed to:', auctionEscrow.address);

  

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();

  await escrow.deployed();
  console.log('Escrow deployed to:', escrow.address);



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});










// const {ethers} = require("hardhat");
// const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constant");

// async function main () {

//   const tescrowDevs = await ethers.getContractFactory("TescrowDev");
//   const TescrowDevsNFT = await tescrowDevs.deploy();
//   await TescrowDevsNFT.deployed();
//   console.log("TescrowDevsNFT contract deployed to", TescrowDevsNFT.address);




//   const AuctionEscrow = await ethers.getContractFactory("Auction");

//   const Auctionescrow = await AuctionEscrow.deploy(TescrowDevsNFT.address);

//   await Auctionescrow.deployed();

//   console.log("Auction contract deployed to", Auctionescrow.address);


//   const Escrow = await ethers.getContractFactory("Escrow");

//   const escrow = await Escrow.deploy();

//   await escrow.deployed();

//   console.log("Escrow contract deployed to", escrow.address);

// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });