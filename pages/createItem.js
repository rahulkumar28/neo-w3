/* pages/create-item.js */
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Head from 'next/head'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', tag1: '', tag2: '', tag3: '', likes: '', downloads: '', type: '' })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            //upload file to ipfs
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
    async function createMarket() {
        const { name, description, price, tag1, tag2, tag3, likes, downloads, type } = formInput
        if (!name || !description || !price || !type || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, tag1, tag2, tag3, likes, downloads, type, image: fileUrl
        })
        try {
            //add metadata to ipfs
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createSale(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function createSale(url) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        //plan to add @rahul

        /* next, create the item */
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        /* then list the item for sale on the marketplace */
        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
        await transaction.wait()
        router.push('/')
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input
                    placeholder="Title"
                    className="mt-8 border rounded p-1"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <textarea
                    placeholder="#tag1"
                    className="mt-1 border rounded p-0"
                    onChange={e => updateFormInput({ ...formInput, tag1: e.target.value })}
                />
                <textarea
                    placeholder="#tag2"
                    className="mt-1 border rounded p-0"
                    onChange={e => updateFormInput({ ...formInput, tag2: e.target.value })}
                />
                <textarea
                    placeholder="#tag2"
                    className="mt-1 border rounded p-0"
                    onChange={e => updateFormInput({ ...formInput, tag3: e.target.value })}
                />
                <textarea
                    placeholder="likes"
                    className="mt-1 border rounded p-0"
                    onChange={e => updateFormInput({ ...formInput, likes: e.target.value })}
                />
                <textarea
                    placeholder="downloads"
                    className="mt-1 border rounded p-1"
                    onChange={e => updateFormInput({ ...formInput, downloads: e.target.value })}
                />
                <textarea
                    placeholder="type"
                    className="mt-1 border rounded p-1"
                    onChange={e => updateFormInput({ ...formInput, type: e.target.value })}
                />
                <input
                    placeholder="Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={onChange}
                />
                {
                    fileUrl && (
                        <img className="rounded mt-4" width="350" src={fileUrl} />
                    )
                }
                <button onClick={createMarket} className="font-bold mt-4 bg-red-500 text-white rounded p-4 shadow-lg">
                    Upload
                </button>
            </div>
        </div>
    )
}