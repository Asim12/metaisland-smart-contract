// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract MetaIslandNFTPass is ERC1155, Ownable {

    using Strings for uint256;
    uint256 public passPrice;
    mapping(uint256 => address) internal creator;
    
    
    constructor(string memory name_, string memory symbol_, uint256 _passPrice, string memory baseURI_) ERC1155(baseURI_) {
        name_           =   name_;
        symbol_         =   symbol_;
        passPrice       =   _passPrice;         
    }


    function exists(uint256 _id) public view returns (bool) {
         return creator[_id] != address(0);       
    }

    function updatePassPrice(uint256 _passPrice) external onlyOwner{
        passPrice = _passPrice;
    }

    
    function _mintBatch(uint256[] memory ids, uint256[] memory amounts) external onlyOwner{
        
        require(msg.sender != address(0), "ERC1155: mint to the zero address");

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            creator[id] = msg.sender;
        }

        _mintBatch(msg.sender, ids, amounts, "");

    }


    function buyPass(uint _id) payable external{
        
        require(msg.sender != address(0), "Zero address");
        require(msg.value == passPrice, "Please enter correct price for minting pass");
        require(balanceOf(msg.sender, _id) < 2, "You can not buy more pass");
        _safeTransferFrom(owner(), msg.sender, _id, 1, "");
    }
    

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(exists(tokenId) == true, "this id doesn't exist");     
        return string(abi.encodePacked(uri(tokenId), tokenId.toString(), ".json"));
    }

    function safeTransferFrom(address from, address , uint256 id, uint256 amount, bytes memory) public override {
        _burn(from, id, amount);
    } 
    
    function withdraw() public payable onlyOwner{  
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}



