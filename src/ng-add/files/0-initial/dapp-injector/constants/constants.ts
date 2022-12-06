// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

export const GRAPH_APIURL = "https://api.thegraph.com/subgraphs/name/jdonosocoding/gratitude-nft"

export const ALCHEMY_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

export type NETWORK_TYPE = 'hardhat' |'localhost' | 'mainnet'| 'mumbai' | 'goerli' |'polygon' | 'xdai' |'noop';

export const settings = {
  localhost: {
    wallet: 'local',
  },
  goerli: {
    wallet: 'wallet',
  },
};


export const address_0 = '0x0000000000000000000000000000000000000000';

export interface INETWORK {
name: NETWORK_TYPE;
color?: string;
price?:number;
gasPrice?:number;
chainId: number;
rpcUrl: string;
blockExplorer?: string;
faucet?:string
}

export const noNetwork:INETWORK =   {
  name:'noop',
  chainId:0,
  rpcUrl:'noop'
}

export const NETWORKS:{[key:string]: INETWORK} = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 1337,
    blockExplorer: "",
    rpcUrl: "http://" + (window ? window.location.hostname : "localhost") + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  polygon: {
    name: "polygon",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com/",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    faucet: "https://faucet.polygon.technology/",
    blockExplorer: "https://mumbai.polygonscan.com/",
  },
};

export const netWorkByName = (chainName:NETWORK_TYPE) => {
  return NETWORKS[chainName]
};


export const netWorkById = (chainId:number) => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
  return noNetwork
};
