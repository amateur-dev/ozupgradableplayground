// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
// const { ethers, upgrades } = require("hardhat");



async function main() {

  // We get the contract to deploy
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy();

  // await greeter.deployed();
  // console.log("Greeter deployed to:", greeter.address);

  const GreeterV2 = await ethers.getContractFactory("Greeter");
  const upgraded = await upgrades.deployProxy(GreeterV2, ["Hello, Hardhat Upgraded!"])
  console.log("upgraded deployed to:", upgraded.address);
  function verify() {
    return new Promise(function(resolve) {
        setTimeout(async () => {
          await hre.run("verify:verify", {
          address: upgraded.address
          })
          resolve();
        }, 10000)
    });
  }
  await verify();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
