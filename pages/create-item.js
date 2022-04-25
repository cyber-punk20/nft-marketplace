const web3 = require('web3')
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
// import TagsInput from './tag-input'
import Web3Modal from 'web3modal'
import {MAX_IMG_ID} from './constants'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import { Card } from 'react-bootstrap'



export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [tags, setTags] = useState(["Iot Data"])
  const [estimated, setEstimated] = useState(false)
  const router = useRouter()
  function getImgPath(id) {
    const imgId = id % MAX_IMG_ID;
    return './imgs/img' + imgId + '.jpeg';
  }
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
      // setImgPath("./imgs/img" + getRandomInt(maxImgId) + ".jpeg")
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function estimatePrice(e) {
    // console.log(e)
    const { name, description, price } = formInput
    if (!name || !description || !fileUrl) return
    if(e.target.checked) {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      const transaction = await contract.payEstimate()
      await transaction.wait()
      setEstimated(true)
    }
    
  }
  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    let byteTags = []
    console.log(tags)
    for(const tag of tags) {
      // console.log(typeof(tag))
      let hextag = web3.utils.asciiToHex(tag.toString());
      let byteTag = web3.utils.hexToBytes(hextag);
      byteTags.push(byteTag)
    }
    
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    
    transaction = await contract.createMarketItem(nftaddress, tokenId, price, byteTags, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
      {/* <input 
        type="checkbox"
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
        id="flexCheckDefault"
        onChange={e => updateFormInput({ ...formInput, use_predict: e.target.value })}
      />
       <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
        Use Predicted Price
       </label> */}
        
        {
          // fileUrl
        }
        {/* {
          fileUrl && imgPath && (
            <img className="rounded mt-4" width="350" src={imgPath} />
          )
        } */}
        {/* <TagsInput></TagsInput> */}
        
        <ReactTagInput 
          tags={tags} 
          onChange={(newTags) => setTags(newTags)}
        />

        <label className="inline-flex items-center mt-3">
         <input 
          type="checkbox" 
          className="form-checkbox h-5 w-5 text-gray-700"
          onChange={e => estimatePrice(e)}
          disabled={estimated}
        /><span className="ml-2 text-gray-700">Use Price Estimation</span>
        </label>
        {
          estimated
          &&
          // <Card>
          //   100 ETH
          // </Card>
          <div className="flex">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Estimated Price</h5>
              <p className="text-gray-700 text-base mb-4">
                100 ETH
       </p>
    {/* <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
  </div>
</div>

        }
        
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
      

        <button onClick={createMarket} className="font-bold mt-4 bg-blue-700 text-white rounded p-4 shadow-lg rounded">
          Create Digital Asset
        </button>
        
      </div>
    </div>
  )
}