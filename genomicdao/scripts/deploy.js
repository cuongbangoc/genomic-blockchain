const { ethers } = require("hardhat");

async function main() {
  const provider = ethers.provider;
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Deployer balance: ", (await provider.getBalance(deployer)).toString());

  const PCSPFactory = await ethers.getContractFactory("PostCovidStrokePrevention");
  const PCSPContract = await PCSPFactory.deploy();

  console.log("PCSP deployed to address:", await PCSPContract.getAddress());

  const NftFactory = await ethers.getContractFactory("GeneNFT");
  const nftContract = await NftFactory.deploy()

  console.log("NFT deployed to address:", await nftContract.getAddress());

  const ControllerFactory = await ethers.getContractFactory("Controller");
  const controllerContract = await ControllerFactory.deploy(await nftContract.getAddress(), await PCSPContract.getAddress());

  await PCSPContract.transferOwnership(await controllerContract.getAddress())
  await nftContract.transferOwnership(await controllerContract.getAddress())

  console.log("Controller deployed to address:", await controllerContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
