//This file contains project settings, here you can change the api key, the network and collection contract addresses

let apiKey = "ivKIAJkvTuuL5wKJ4MP9A-q72C0IO-r-";

export let settings = { 
    apiUrl: `https://polygon-mainnet.g.alchemyapi.io/nft/v2/${apiKey}/getNFTs`,
    //Learn Web3 DAO and Build Space collection addresses in that order
    contractAddresses: ["0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33", "0x3CD266509D127d0Eac42f4474F57D0526804b44e"],
    collectionNames: ["Learn Web3 DAO", "Build Space"],
}