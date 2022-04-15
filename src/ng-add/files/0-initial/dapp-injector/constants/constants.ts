// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

export const GRAPH_APIURL = "https://api.thegraph.com/subgraphs/name/jdonosocoding/gratitude-nft"

export const ALCHEMY_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

export type NETWORK_TYPE = 'hardhat' |'localhost' | 'mainnet'| 'mumbai' | 'kovan' | 'rinkeby' | 'ropsten' | 'goerli' |'polygon' | 'xdai' |'noop';


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
  kovan: {
    name: "kovan",
    color: "#7003DD",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
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
  // localArbitrum: {
  //   name: "localArbitrum",
  //   color: "#50a0ea",
  //   chainId: 153869338190755,
  //   blockExplorer: "",
  //   rpcUrl: `http://localhost:8547`,
  // },
  // localArbitrumL1: {
  //   name: "localArbitrumL1",
  //   color: "#50a0ea",
  //   chainId: 44010,
  //   blockExplorer: "",
  //   rpcUrl: `http://localhost:7545`,
  // },
  // rinkebyArbitrum: {
  //   name: "Arbitrum Testnet",
  //   color: "#50a0ea",
  //   chainId: 421611,
  //   blockExplorer: "https://rinkeby-explorer.arbitrum.io/#/",
  //   rpcUrl: `https://rinkeby.arbitrum.io/rpc`,
  // },
  // arbitrum: {
  //   name: "Arbitrum",
  //   color: "#50a0ea",
  //   chainId: 42161,
  //   blockExplorer: "https://explorer.arbitrum.io/#/",
  //   rpcUrl: `https://arb1.arbitrum.io/rpc`,
  //   gasPrice: 0,
  // },
  // localOptimismL1: {
  //   name: "localOptimismL1",
  //   color: "#f01a37",
  //   chainId: 31337,
  //   blockExplorer: "",
  //   rpcUrl: "http://" + (window ? window.location.hostname : "localhost") + ":9545",
  // },
  // localOptimism: {
  //   name: "localOptimism",
  //   color: "#f01a37",
  //   chainId: 420,
  //   blockExplorer: "",
  //   rpcUrl: "http://" + (window ? window.location.hostname : "localhost") + ":8545",
  //   gasPrice: 0,
  // },
  // kovanOptimism: {
  //   name: "kovanOptimism",
  //   color: "#f01a37",
  //   chainId: 69,
  //   blockExplorer: "https://kovan-optimistic.etherscan.io/",
  //   rpcUrl: `https://kovan.optimism.io`,
  //   gasPrice: 0,
  // },
  // optimism: {
  //   name: "optimism",
  //   color: "#f01a37",
  //   chainId: 10,
  //   blockExplorer: "https://optimistic.etherscan.io/",
  //   rpcUrl: `https://mainnet.optimism.io`,
  // },
  // localAvalanche: {
  //   name: "localAvalanche",
  //   color: "#666666",
  //   chainId: 43112,
  //   blockExplorer: "",
  //   rpcUrl: `http://localhost:9650/ext/bc/C/rpc`,
  //   gasPrice: 225000000000,
  // },
  // fujiAvalanche: {
  //   name: "fujiAvalanche",
  //   color: "#666666",
  //   chainId: 43113,
  //   blockExplorer: "https://cchain.explorer.avax-test.network/",
  //   rpcUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
  //   gasPrice: 225000000000,
  // },
  // mainnetAvalanche: {
  //   name: "mainnetAvalanche",
  //   color: "#666666",
  //   chainId: 43114,
  //   blockExplorer: "https://cchain.explorer.avax.network/",
  //   rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
  //   gasPrice: 225000000000,
  // },
  // testnetHarmony: {
  //   name: "testnetHarmony",
  //   color: "#00b0ef",
  //   chainId: 1666700000,
  //   blockExplorer: "https://explorer.pops.one/",
  //   rpcUrl: `https://api.s0.b.hmny.io`,
  //   gasPrice: 1000000000,
  // },
  // mainnetHarmony: {
  //   name: "mainnetHarmony",
  //   color: "#00b0ef",
  //   chainId: 1666600000,
  //   blockExplorer: "https://explorer.harmony.one/",
  //   rpcUrl: `https://api.harmony.one`,
  //   gasPrice: 1000000000,
  // },
  // fantom: {
  //   name: "fantom",
  //   color: "#1969ff",
  //   chainId: 250,
  //   blockExplorer: "https://ftmscan.com/",
  //   rpcUrl: `https://rpcapi.fantom.network`,
  //   gasPrice: 1000000000,
  // },
  // testnetFantom: {
  //   name: "testnetFantom",
  //   color: "#1969ff",
  //   chainId: 4002,
  //   blockExplorer: "https://testnet.ftmscan.com/",
  //   rpcUrl: `https://rpc.testnet.fantom.network`,
  //   gasPrice: 1000000000,
  //   faucet: "https://faucet.fantom.network/",
  // },
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
