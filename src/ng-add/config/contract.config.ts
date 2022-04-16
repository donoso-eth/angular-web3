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
  superFluid: {
    "artifactsPath": "SuperApp.sol/SuperApp.json",
    "name": "SuperApp",
    "ctor": ["0xEB796bdb90fFA0f28255275e16936D25d3418603",
    "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
    "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"],
    "jsonName": "super_app"
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
