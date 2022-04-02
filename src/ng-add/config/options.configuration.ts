import { DappDemoType, AddOnsType } from "../schema";

export interface IDEMO {
  deps: { [key: string]: string };
  devDeps: { [key: string]: string };
  scripts: { [key: string]: string };
  templates_root: Array<{
    source: string;
    target: string;
  }>;
  templates_src: Array<{
    source: string;
    target: string;
  }>;
}

export interface IDEMO_APP extends IDEMO {
  addOns: Array<AddOnsType>;
}

export interface IDEMO_SERVICE extends IDEMO {}

export const configuration_options: {
  initial: IDEMO_APP;
  dappDemoCommon: IDEMO_APP,
  dappDemos: { [key in DappDemoType]: IDEMO_APP };
  addOns: { [key in AddOnsType]: IDEMO_SERVICE };
} = {
  initial: {
    deps: {
      ethers: "^5.0.0",
      "@ngrx/store": "^13.0.2",
      "@download/blockies": "^1.0.3",
    },
    devDeps: {
      "@nomiclabs/hardhat-ethers": "2.0.2",
      "@nomiclabs/hardhat-etherscan": "2.1.8",
      "@nomiclabs/hardhat-waffle": "2.0.0",
      "@typechain/ethers-v5": "8.0.5",
      "@typechain/hardhat": "3.0.0",
      typechain: "6.0.5",
      hardhat: "^2.8.0",
      "hardhat-contract-sizer": "2.1.1",
      "hardhat-gas-reporter": "1.0.6",
      "hardhat-log-remover": "2.0.2",
      "hardhat-spdx-license-identifier": "2.0.3",
      "@types/fs-extra": "^9.0.13",
      "@types/chai": "^4.2.21",
      "@types/mocha": "^9.0.0",
      "@types/node": "^12.0.0",
      "@typescript-eslint/eslint-plugin": "^4.29.1",
      "@typescript-eslint/parser": "^4.29.1",
      chai: "^4.2.0",
      dotenv: "^10.0.0",
      eslint: "^7.29.0",
      "fs-extra": "^10.0.0",
      "eslint-config-prettier": "^8.3.0",
      "eslint-config-standard": "^16.0.3",
      "eslint-plugin-import": "^2.23.4",
      "eslint-plugin-node": "^11.1.0",
      "eslint-plugin-prettier": "^3.4.0",
      "eslint-plugin-promise": "^5.1.0",
      "ethereum-waffle": "^3.0.0",
      "@openzeppelin/contracts": "^4.5.0",
      prettier: "^2.3.2",
      "prettier-plugin-solidity": "^1.0.0-beta.13",
      solhint: "^3.3.6",
      "solidity-coverage": "^0.7.16",
      "node-watch": "^0.7.2",
      "ts-node": "^10.1.0",
      bip39: "^3.0.4",
      "ethereumjs-wallet": "^1.0.2",
      mustache: "^3.1.0",
    },
    scripts: {
      chain:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json node",
      accounts:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json accounts",
      compile:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile",
      generate:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json generate",
      deploy:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts",
      "contracts:test":
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json test",
      "contracts:coverage":
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json coverage",
      "watch-contract": "cd hardhat && node scripts/helpers/watch.js",
      "watch-tinker": "cd hardhat && node scripts/helpers/tinker-watch.js",
      wire: "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/helpers/wire.ts",
      tinker:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/tinker.ts",
    },
    addOns: [],
    templates_root: [
      {
        source: "./files/0-initial/hardhat",
        target: "/hardhat/",
      },
    ],
    templates_src: [
      {
        source: "./files/0-initial/app",
        target: "/app",
      },
      {
        source: "./files/0-initial/dapp-injector",
        target: "/app/dapp-injector",
      },
      {
        source: "./files/0-initial/typings",
        target: "",
      },
    ],
  },
  dappDemoCommon:{
    deps:{
      "@download/blockies": "^1.0.3",
      "@angular/cdk": "~13.2.2",
      "@angular/material": "~13.2.2",
    },
    devDeps: {},
    scripts: {},
    addOns:[],
    templates_root: [],
    templates_src: [],
  },
  dappDemos: {
    minimalContract: {
      deps: {},
      devDeps: {},
      scripts: {},
      addOns: [],
      templates_root: [
        {
          source: "./files/demos/demo-minimal-contract/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-minimal-contract/demo",
          target: "/app/0-minimal-contract",
        },
      ],
    },
    helloWorldContract: {
      deps: {},
      devDeps: {},
      scripts: {},
      addOns: [],
      templates_root: [
        {
          source: "./files/demos/demo-hello-world-contract/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-hello-world-contract/demo",
          target: "/app/1-hello-world-contract",
        },
      ],
    },
    debugContract: {
      deps: {},
      devDeps: {},
      scripts: {},
      addOns: [],
      templates_root: [
        {
          source: "./files/demos/demo-debug-contract/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-debug-contract/demo",
          target: "/app/2-debug-contract",
        },
      ],
    },
    nftContract: {
      deps: {},
      devDeps: {},
      scripts: {},
      addOns: ["ipfsService"],
      templates_root: [
        {
          source: "./files/demos/demo-nft-contract/hardhat",
          target: "/hardhat/",
        },
        {
          source: "./files/demos/demo-nft-contract/custom-webpack",
          target: "",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-nft-contract/demo",
          target: "/app/3-nft-contract",
        },
      ],
    },
    //// lens app
    lensProtocol: {
      deps: {},
      devDeps: {},
      scripts: {},
      addOns: ["ipfsService"],
      templates_root: [
        {
          source: "./files/demos/demo-lens-protocol/hardhat",
          target: "/hardhat/",
        },
        {
          source: "./files/demos/demo-lens-protocol/custom-webpack",
          target: "",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-lens-protocol/demo",
          target: "/app/4-lens-protocol",
        },
      ],
    },
  },
  addOns: {
    subgraph: {
      deps: {
        "@apollo/client": "^3.5.10",
        "apollo-angular": "^3.0.0",
        "graphql": "^16.3.0",
      },
      devDeps: {
        "@graphprotocol/graph-cli": "^0.22.1",
        "@graphprotocol/graph-ts": "^0.22.1",
        "js-yaml": "^4.1.0",
        "@types/js-yaml": "^4.0.5",
      },
      scripts: {
        "run-graph-node": "cd services/graph-node && docker-compose up",
        "remove-graph-node": "cd graph-node && docker-compose down",
        "clean-graph-node": "rm -rf cd services/graph-node/data/",
        codegen: "cd subgraph && graph codegen",
        "build-graph": "cd subgraph && graph build",
        "deploy-graph":
          "cd services/graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ GITHUB_USERNAME/your-contract",
        "create-graph-local":
          "cd subgraph && graph create --node http://localhost:8020/ angular-web3/your-contract",
        "remove-graph-local":
          "cd subgraph && graph remove --node http://localhost:8020/ angular-web3/your-contract",
        "deploy-graph-local":
          "cd subgraph && graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 angular-web3/your-contract",
      },
      templates_root: [
        {
          source: "./files/add-ons/subgraph/subgraph",
          target: "/add-ons/subgraph",
        },
        {
          source: "./files/add-ons/subgraph/hardhat",
          target: "/hardhat",
        },
      ],
      templates_src: [],
    },
    ipfsService: {
      deps: {
        "ang-jsoneditor": "^1.10.5",
        "json-editor": "^0.7.28",
        "@angular-builders/custom-webpack": "^13.1.0",
      },
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [],
    },
    graphNode: {
      deps: {},
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [],
    },
    graphQlService:{
      deps: {},
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [],
    },
    litProtocol: {
      deps: {
        "lit-js-sdk": "^1.1.149",
      },
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [],
    },
  },
};
