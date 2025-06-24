async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const HTT = await ethers.getContractFactory("HoboTradersToken");
  const contract = await HTT.deploy(deployer.address); // твой адрес как feeRecipient

  await contract.waitForDeployment();

  console.log("HTT deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 