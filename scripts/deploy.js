async function main() {
	const MetaNFTPass = await ethers.getContractFactory('MetaNFTPass');
	const contract = await MetaNFTPass.deploy(
        "MetaIslandPasstest",
        "MPT", 
        "1" ,
        "ipfs://testing"
    );
    console.log(contract.address)


}
main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });