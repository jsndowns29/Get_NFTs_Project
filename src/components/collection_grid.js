import React, {useEffect, useState} from "react"
import axios from 'axios';
import { Container, Col } from 'react-grid';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NftTile from "../components/nft_tile.js"
import '../style.css' 

export default function CollectionGrid({walletAddress, collectionName, contractAddress, apiUrl}) {

   const [nfts, setNfts] = useState([]);
   
   //temp variables for parsing NFT data and pushing to NFTs array
   let nftURL = "";
   let nftTitle = "";
   let toPush = {};
   let arr = [];

   //only display collection title if wallet contains 1 or more NFTs from that collection
   let title;
   if (nfts.length !== 0){
       title = <h2 className="tile-text-main tile-text-main-mobile">{collectionName}</h2>;
   }else{
       title = <div/>
   }

   //make request to alchemy API to get NFTs from specified wallet and collection 
   //API info: https://docs.alchemy.com/reference/getnfts
   const options = {
        method: 'GET',
        url: apiUrl,
        params: {
        owner: walletAddress,
        'contractAddresses[]': contractAddress,
        withMetadata: 'true',
        },
        headers: {accept: 'application/json'}
   };

   useEffect(()=>{
        axios
        .request(options)
        .then(function (response) {
            
            //loop through affay of NFTs returned by the API and parse
            for(let i=0;i<response.data.totalCount;i++){
                nftURL = response.data.ownedNfts[i].media[0].gateway;
                nftTitle = response.data.ownedNfts[i].metadata.name;

                toPush = {url: nftURL, title: nftTitle};
                arr.push(toPush);
                
            }
            setNfts(arr);
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
   }, [walletAddress]);

   console.log(nfts);
    
  return <div>

    {title}
    {/*Desktop Grid View*/}
      <Container fluid  id="nft-grid" >
            <div className="center">
                {nfts.map((data)=>{
                    return <Col md="auto">
                        <NftTile url={data.url} title={data.title} />
                    </Col>  
                })}
            </div>
    </Container>

    {/*Mobile Carousel View*/}
    <div id="mobile-carousel">
        <Carousel showStatus={false} centerMode={true} centerSlidePercentage={100}>
            {nfts.map((data)=>{
                    return <div className="mobile-tile">
                      <NftTile url={data.url} title={data.title} />
                    </div>  
            })}
        </Carousel>                   
    </div>
  
  
  </div>
}