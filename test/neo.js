/* test/sample-test.js */
describe("N1ceMP", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const Market = await ethers.getContractFactory("N1ceMP")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* put both tokens for sale */
    await market.createNCToken(
      "https://www.mytokenlocation.com",
      auctionPrice,
      1,
      2,
      2,
      { value: listingPrice }
    )
    await market.createNCToken(
      "https://www.mytokenlocation2.com",
      auctionPrice,
      1,
      2,
      2,
      { value: listingPrice }
    )

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    //await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice })
    await market.connect(buyerAddress).purchaseNCT(0, { value: auctionPrice })

    /* query for and return the unsold items */
    let items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await market.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})