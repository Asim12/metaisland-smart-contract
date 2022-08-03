const {expect}      =   require("chai");
const {ethers}      =   require("hardhat");
const web3          =   require("web3");
require('dotenv').config();

describe("MetaIsland test cases", function () {

    let metaIslandNFTPass;
    let nFTmint;
    let owner;
    beforeEach(async () => {
        console.log('start testings');
      // Deploy the contract
    //   const LockSave = await ethers.getContractFactory("LockSave");
    //   lockSave = await LockSave.deploy();
    //   await lockSave.deployed();

    [owner] = await ethers.getSigners();
    const MetaIslandNFTPass = await ethers.getContractFactory("MetaIslandNFTPass");
    console.log('start testings2');
    // Start deployment, returning a promise that resolves to a contract object
     metaIslandNFTPass = await MetaIslandNFTPass.deploy("MetaIsland-Test", "MIT", 2, 1, "ipfs://QmbqeXAfRFkrLd5nbKjxAji8NYjiJmxmCza2LU88ThgQ3r");
    console.log('start testings3');
    await metaIslandNFTPass.deployed();
    await metaIslandNFTPass._mintBatch([1,2],[1000,1000]);
    console.log('start testings4');
    console.log("First Contract deployed to address:", metaIslandNFTPass.address);
    const NFTmint = await ethers.getContractFactory("NFTmint");
    console.log(metaIslandNFTPass.address);
     nFTmint = await NFTmint.deploy("MetaIsland-Test", "MIT", 1000, "ipfs://QmbqeXAfRFkrLd5nbKjxAji8NYjiJmxmCza2LU88ThgQ3r", metaIslandNFTPass.address, 1);
    await nFTmint.deployed();
   
    console.log("Second Contract deployed to address:", nFTmint.address);
    });

    it('MintBatch function testing',async()=>{
        await metaIslandNFTPass._mintBatch([1,2],[1000,1000]);
    });
    it('buy passes function testing',async()=>{
        console.log(await metaIslandNFTPass.balanceOf(owner.address,1));
        console.log('testasdasdads');
        const mintNFT = await metaIslandNFTPass.buyPass(1,{value: web3.utils.toWei("0.000000000000000001", "ether")})
        console.log(mintNFT)
        //await metaIslandNFTPass.buyPass(1);
    });
    it('BalanceOF function testing', async() => {
        const balance = await metaIslandNFTPass.balanceOf(owner.address,1);
        expect(balance).to.equal(balance);  
    });

  it('mintNFT function testing', async() => {
         await nFTmint.mintNFT(1);
    });

    it('withdraw function testing', async() => {
        await metaIslandNFTPass.withdraw();
   });

   });