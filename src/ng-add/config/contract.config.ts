export const contract_config = {
  minimalContract: {
    artifactsPath: "0-MinimalContract.sol/MinimalContract.json",
    name: "MinimalContract",
    ctor: [],
    jsonName: "minimal_contract",
  },
  helloWorldContract: {
    artifactsPath: "1-HelloWorldContract.sol/HelloWorldContract.json",
    name: "HelloWorldContract",
    ctor: ["Hello Angular On Chain"],
    jsonName: "hello_world_contract",
  },

  debugContract: {
    artifactsPath: "2-DebugContract.sol/DebugContract.json",
    name: "DebugContract",
    ctor: ["Hello Debug Contract On Chain"],
    jsonName: "debug_contract",
  },
  nftContract: {
    artifactsPath: "3-NftContract.sol/NftContract.json",
    name: "NftContract",
    ctor: [],
    jsonName: "nft_contract",
  },
  lensProtocol: {
    artifactsPath: "4-LensHub.sol/LensHub.json",
    name: "LensHub",
    ctor: [],
    jsonName: "lens_hub",
  },
  theGraph: {
    "artifactsPath": "GravatarRegistry.sol/GravatarRegistry.json",
    "name": "GravatarRegistry",
    "ctor": [],
    "jsonName": "gravity"
  }
};
