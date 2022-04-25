const web3 = require('web3')
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { Badge } from 'react-bootstrap'
import { MDBBadge } from 'mdb-react-ui-kit'
import {
  nftmarketaddress, nftaddress
} from '../config'
import { MAX_IMG_ID} from './constants'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  function getImgPath(id) {
    const imgId = id % MAX_IMG_ID + 1;
    return './imgs/img' + imgId + '.jpeg';
  }
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let tags = []
      for(const tag of i.tags) {
        tag = web3.utils.hexToAscii(web3.utils.bytesToHex(tag))
        tags.push(tag)
      }
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: getImgPath(i.tokenId.toNumber()),
        tags: tags
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    
    <div>

      <div className="px-4">
        <h2 className="text-2xl py-2">Items Created</h2>
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
                <div className="p-4">
                  <Stack direction="row" spacing = {nft.tags.length}>
                  {
                    nft.tags.map((tag, i) => (
                      <div key={i}>
                        <MDBBadge className='mx-1 p-2' color='secondary'>
                            {'#' + tag}
                        </MDBBadge>
                      </div>
                    ))
                  }
                  </Stack>
                </div>
                
              </div>
            ))
          }
        </div>
      </div>
      
        <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
              <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft, i) => (
                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                      <img src={nft.image} className="rounded" />
                      <div className="p-4 bg-black">
                        <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                        
                      </div>
                      <div className="p-4">
                        <Stack direction="row" spacing = {nft.tags.length}>
                        {
                          nft.tags.map((tag, i) => (
                            <div key={i}>
                              <MDBBadge pill className='mx-1 p-2' color='secondary'>
                              {'#' + tag}
                              </MDBBadge>
                            </div>
                          ))
                        }
                        </Stack>
                      </div>
                      
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
    </div>
  )
}