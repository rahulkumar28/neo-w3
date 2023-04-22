/// SPDX-License-Identifier: MIT
// contracts/N1ceMP.sol

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract N1ceMP is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable,
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //owner of contract
    address payable contractOwner;
    //address of marketplace contract
    address payable contractAddress;

    //counters for statistics
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemsResold;
    Counters.Counter private _itemsListed;

    //minimum listing price from marketplace perspective
    uint256 listingPrice = 0.025 ether;
    //sales comission for marketplace for any first time sale
    uint256 saleCommision = 5;
    //resales comission for marketplace for any resell
    uint256 resellCommision = 2;
    //enum to restrict the type of tokens
    enum TokenType {
        METAVERSE,
        AVATAR,
        GAMES,
        MOVIES,
        EVENT
    }

    //structure to hold market item details
    struct MarketNCT {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        address payable origOwner;
        uint256 price;
        uint256 royalty;
        uint256 totalSupply;
        uint256 count;
        TokenType tokenType;
        bool sold;
        bool onResale;
    }

    constructor() ERC721("N1ceTokens", "NCT") {
        contractOwner = payable(msg.sender);
        contractAddress = payable(address(this));
        _itemsSold.reset();
        _itemsResold.reset();
        _itemsListed.reset();
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // above overrides required by solidity

    mapping(uint256 => MarketNCT) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address indexed seller,
        address payable indexed owner,
        address payable origOwner,
        uint256 price,
        uint256 royalty,
        uint256 totalSupply,
        uint256 count,
        TokenType tokenType,
        bool sold,
        bool onResale,
        uint256 listedCount
    );

    //TODO add more events - updates, purchase

    /* Returns address of contract */
    function getContractAddress() public view returns (address) {
        return contractAddress;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* set listing price of the contract */
    function setListingPrice(uint256 price) public onlyOwner {
        listingPrice = price;
    }

    /* Returns the sale comission of the contract */
    function getSaleCommision() public view returns (uint256) {
        return saleCommision;
    }

    /* set sale commission of the contract */
    function setSaleCommision(uint256 comission) public onlyOwner {
        saleCommision = comission;
    }

    /* Returns the resale comission of the contract */
    function getResellCommision() public view returns (uint256) {
        return resellCommision;
    }

    /* set resale commission of the contract */
    function setReSellCommision(uint256 comission) public onlyOwner {
        resellCommision = comission;
    }

    /* Returns the total items sold */
    function getItemsSold() public view returns (uint256) {
        return _itemsSold.current();
    }

    /* Returns the total resell that happened */
    function getItemsResold() public view returns (uint256) {
        return _itemsResold.current();
    }

    /* Returns the total current listed item in MP */
    function getItemsListed() public view returns (uint256) {
        return _itemsListed.current();
    }

    /* Returns total Earning value of MP */
    function getN1ceMPBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function createNCToken(
        string memory tokenURI,
        uint256 price,
        uint256 royalty,
        uint256 totalSupply,
        TokenType tokenType
    ) public payable returns (uint256) {
        //starting token id from Zero
        uint256 newItemId = _tokenIds.current();
        //increment token-id value for next
        _tokenIds.increment();
        //mint token and make msg.sender as owner
        _safeMint(msg.sender, newItemId);
        //set token URI
        _setTokenURI(newItemId, tokenURI);
        //approve N1ce as operator for this NFT by owner
        approve(contractAddress, newItemId);

        //call createN1ceItem to create item for N1ce MP
        createN1ceItem(newItemId, price, royalty, totalSupply, tokenType);

        return newItemId;
    }

    /* Places an item for sale on the marketplace */
    function createN1ceItem(
        uint256 tokenId,
        uint256 price,
        uint256 royalty,
        uint256 totalSupply,
        TokenType tokenType
    ) private nonReentrant {
        //check price should be more than 0
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value >= listingPrice,
            //"Price must >= than listing price: " + Strings.toString(listingPrice)
            "Price must >= than listing price: "
        );
        //total supply should be 1 or greater
        require(totalSupply > 0, "Total supply should be >0");

        //store map of this item in contract instance
        idToMarketItem[tokenId] = MarketNCT(
            tokenId,
            payable(address(0)),
            payable(msg.sender),
            payable(msg.sender),
            price,
            royalty,
            totalSupply,
            0,
            tokenType,
            false,
            true
        );
        _itemsListed.increment();

        emit MarketItemCreated(
            tokenId,
            payable(address(0)),
            payable(msg.sender),
            payable(msg.sender),
            price,
            royalty,
            totalSupply,
            0,
            tokenType,
            false,
            true,
            _itemsListed.current()
        );
    }

    /* Update the price of listed item */
    /* only Owner of item or approved MP can do */
    function updateItemPrice(uint256 itemId, uint256 newPrice) public {
        //check if called by owner of the item, //TODO can also use ownerOf function ownerOf(itemId)
        require(
            msg.sender == idToMarketItem[itemId].owner,
            "Not an Owner of the Item"
        );
        //check price should be more than 0
        require(newPrice > 0, "Price must be at least 1 wei");
        //new price shouldnt be same as old one
        require(
            newPrice != idToMarketItem[itemId].price,
            //"Price same as old price : " + Strings.toString(newPrice)
            "Price same as old price : "
        );
        idToMarketItem[itemId].price = newPrice;
    }

    /* put Item for sale on MP */
    /* only Owner of item or approved MP can do */
    function putItemOnSale(uint256 itemId, uint256 newPrice) public {
        //check if called by owner of the item, //TODO can also use ownerOf function ownerOf(itemId)
        require(
            msg.sender == idToMarketItem[itemId].owner,
            "Not an Owner of the Item"
        );
        //check price should be more than 0
        require(newPrice > 0, "Price must be at least 1 wei");
        //item shouldnt already be on MP
        require(
            idToMarketItem[itemId].onResale == true,
            "Item Already on Sale on N1ce"
        );

        //set new price for the item
        idToMarketItem[itemId].price = newPrice;
        //set item is on sale
        idToMarketItem[itemId].onResale = true;
        //approve N1ce as operator for this NFT by owner
        approve(contractAddress, itemId);
        //reduce count of current supply of the token
        idToMarketItem[itemId].count++;
        //increment listing count of N1ceMP
        _itemsListed.increment();
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties 
        Msg.value will come to Contract n1ce-MP, Then it has to keep comission, 
        royalty to original-owner and transfer rest price to owner 
    */
    function purchaseNCT(uint256 itemId) public payable nonReentrant {
        //check if not sending to yoruself
        require(
            msg.sender != idToMarketItem[itemId].owner,
            "Sending to Yourself not allowed"
        );

        //check if item avaiable for sale (1st time or on resale)
        bool isAvailable = (!idToMarketItem[itemId].sold ||
            idToMarketItem[itemId].onResale)
            ? true
            : false;
        //check if item is available for sale
        require(isAvailable, "Item is not Available for sale");

        //check if item supply is there to buy //TODO apply more robust supply logic or use ERC1155 option
        bool isSupplyAvailable = (idToMarketItem[itemId].count <
            idToMarketItem[itemId].totalSupply)
            ? true
            : false;
        //check if item  supply is there to buy
        require(isSupplyAvailable, "Item supply is not sufficient");

        //get price for the item
        uint256 price = idToMarketItem[itemId].price;
        //check if submitted price is >= asking price
        require(
            msg.value >= price,
            "Please submit >= asking price in order to complete the purchase"
        );

        //calculate comission based on 1st time or resale//need to check if calcualtion will yield right result
        uint256 comission4Sale = (idToMarketItem[itemId].sold)
            ? ((saleCommision * price) / 100)
            : ((resellCommision * price) / 100);
        //calculate royalty
        uint256 royalty4sale = ((price * idToMarketItem[itemId].royalty) / 100);

        //transfer royalty to original owner from N1ce-MP //TODO update to more safe call function
        if (royalty4sale > 0) {
            //used safe openzepplin sendvalue function
            Address.sendValue(idToMarketItem[itemId].origOwner, royalty4sale);
            ////old implementation commented
            //payable(idToMarketItem[itemId].origOwner).transfer(royalty4sale);
        }
        //transfer rest of the msg.vlaue to owner of item //TODO update to more safe call function
        //used safe openzepplin sendvalue function
        Address.sendValue(
            payable(ownerOf(itemId)),
            (msg.value - royalty4sale - comission4Sale)
        );
        //old implementation commented
        //payable(ownerOf(itemId)).transfer(msg.value - royalty4sale - comission4Sale);
        //transfer ownership of item to new owner
        safeTransferFrom(idToMarketItem[itemId].owner, msg.sender, itemId);

        //update item in mapping
        idToMarketItem[itemId].seller = payable(ownerOf(itemId));
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        idToMarketItem[itemId].onResale = false;
        idToMarketItem[itemId].count++;

        //update stats
        _itemsSold.increment();
        _itemsResold.increment();
        _itemsListed.decrement();
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketNCT[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _itemsListed.current();
        uint256 currentIndex = 0;

        MarketNCT[] memory items = new MarketNCT[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            //if item unsold or onResale
            if (!idToMarketItem[i].sold || idToMarketItem[i].onResale) {
                MarketNCT storage currentItem = idToMarketItem[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketNCT[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketNCT[] memory items = new MarketNCT[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                MarketNCT storage currentItem = idToMarketItem[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
