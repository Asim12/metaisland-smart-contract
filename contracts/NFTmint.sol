// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../interface/ILaunchpadNFT.sol";

contract NFTmint is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseURI;
    uint public LAUNCH_MAX_SUPPLY;
    uint public LAUNCH_SUPPLY;
    IERC1155 public  IERC1155Interface;
    address public LAUNCHPAD;
    bytes  data;
    uint public burnToken;
    constructor(string memory _name, string memory _symbol, uint _maxSupply, string memory _baseUrl, address _contract, uint _burnNumberOfToken) ERC721(_name,_symbol){
        baseURI = _baseUrl;
        LAUNCH_MAX_SUPPLY = _maxSupply;
        IERC1155Interface = IERC1155(_contract);
        LAUNCHPAD = _contract;
        burnToken = _burnNumberOfToken;
    }

    function mintNFT(uint256 _id) external{
        require(IERC1155Interface.balanceOf(msg.sender,_id) >= burnToken,"Insufficient balance please buy pass before mint" );
        require(LAUNCH_SUPPLY+1 <= LAUNCH_MAX_SUPPLY, "Max supply reached");
        require(msg.sender != address(0),"Invalid address");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        IERC1155Interface.safeTransferFrom(msg.sender, 0x000000000000000000000000000000000000dEaD ,_id,burnToken,""); 
        LAUNCH_SUPPLY++;
    }   

     function tokenURI(uint256 _id) public view virtual override returns (string memory) {
        require(_exists(_id), "ERC721: URI query for nonexistent token.");
        return string(abi.encodePacked(baseURI, Strings.toString(_id), ".json"));
    }
    // Galler Functions 
    function mintTo(address to, uint size) external onlyLaunchpad {
        require(to != address(0), "can't mint to empty address");
        require(size > 0, "size must greater than zero");
        require(LAUNCH_SUPPLY + size <= LAUNCH_MAX_SUPPLY, "max supply reached");

        for (uint256 i=1; i <= size; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(to, newItemId);
            LAUNCH_SUPPLY++;
        }
    }
      modifier onlyLaunchpad() {
        require(LAUNCHPAD != address(0), "launchpad address must set");
        require(msg.sender == LAUNCHPAD, "must call by launchpad");
        _;
    }
     function getMaxLaunchpadSupply() view public returns (uint256) {
        return LAUNCH_MAX_SUPPLY;
    }
    function getLaunchpadSupply() view public returns (uint256) {
        return LAUNCH_SUPPLY;
    }
}

// contract done by amir Ishaque updated on 6th July 2022