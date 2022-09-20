import React from "react"
import '../style.css' 

export default function NftTile({url, title}) {
   
  //check if nft is mp4 and return appropriate element  
  let mp4 = url.endsWith(".mp4");  
  let nft;
  if(mp4){
    nft = <div>
            <video className="nft-icon" width="300" height="190" autoPlay loop muted>
                <source src={url} type="video/mp4" />
            </video>
          </div>;
  }else{
    nft = <img className="nft-icon mobile-image-center-fix" src={url} alt={title} width="300" height="190" />;
  }
    
  return <div className="nft-tile">
      
      <div className="tile-text">
        {nft}
        <p className="featuresTitle">{title}</p>
    
    </div>

  </div>
}
