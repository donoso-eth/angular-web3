export const contract_config = {
  tinkerContract: {
    artifactsPath: "0-TinkerContract.sol/TinkerContract.json",
    name: "TinkerContract",
    jsonName: "tinker_contract",
  },
  minimalContract: {
    artifactsPath: "0-MinimalContract.sol/MinimalContract.json",
    name: "MinimalContract",
    jsonName: "minimal_contract",
  },
  helloWorldContract: {
    artifactsPath: "1-HelloWorldContract.sol/HelloWorldContract.json",
    name: "HelloWorldContract",
    ctor: "Hello Angular On Chain",
    jsonName: "hello_world_contract",
  },

  debugContract: {
    artifactsPath: "2-DebugContract.sol/DebugContract.json",
    name: "DebugContract",
    ctor: "Hello Debug Contract On Chain",
    jsonName: "debug_contract",
  },
};
