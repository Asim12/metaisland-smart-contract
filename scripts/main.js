
async function main() {

	const [deployer] = await ethers.getSigners();
	const NFT = await ethers.getContractFactory("NFT");
	const contract = await NFT.deploy(
    "MyTest",
    "TST",
    "ipfs://QmXBjRRgHf8FEaJupiM3o7ttkzv6CTmuHq1iFXktDG1FBD/",
    "0x9642617Bbbd552FA363e04CD082703Be403fC25B" ,
    "1000"
        
  );
	console.log("Contract deployed at:", contract.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  //escrow details
  //https://blog.logrocket.com/develop-solidity-smart-contracts-hardhat/

  //apikey   XBYQVS8AFZTKC2B187XTNP7UQN3KDH5APD
  //end points https://api-testnet.bscscan.com/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=XBYQVS8AFZTKC2B187XTNP7UQN3KDH5APD