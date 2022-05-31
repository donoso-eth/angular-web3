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
      "ethereumjs-util": "^7.1.4",
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
      compile:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile",
      fork: "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json node  --network hardhat",
       deploy:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts",
      "contracts:test":
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json test",
      "contracts:coverage":
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json coverage",
      "watch-contract": "cd hardhat && nodehelpers/watch.js",
      "watch-tinker": "cd hardhat && nodehelpers/tinker-watch.js",
      wire: "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run .helpers/wire.ts",
      tinker:
        "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/tinker.ts",
        task: "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json",
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
    templates_src: [ {
      source: "./files/demos/components",
      target: "/app/dapp-components",
    }],
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
  //// SuperFluid Demo app
    superFluid: {
      deps: {"@superfluid-finance/ethereum-contracts": "^1.1.1" },
      devDeps: {},
      scripts: { },
      addOns: ["superFluidService"],
      templates_root: [
        {
          source: "./files/demos/demo-super-fluid/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-super-fluid/demo",
          target: "/app/6-super-fluid",
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
    theGraph: {
      deps: {},
      devDeps: {},
      scripts: {},
      addOns: ["graphNode","graphQlService","subgraph"],
      templates_root: [
        {
          source: "./files/demos/demo-the-graph/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demos/demo-the-graph/demo",
          target: "/app/5-the-graph",
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
        "publish:subgraph": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/publish.ts",
        "codegen": "cd add-ons/subgraph && graph codegen",
        "build-graph": "cd add-ons/subgraph && graph build",
        "deploy-graph": "cd add-ons/subgraph && graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ GITHUB_USERNAME/your-contract"
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
      templates_src: [{
        source: "./files/add-ons/dapp-service-ipfs",
        target: "/app/dapp-injector/services/ipfs",
      }
    ],
    },
    graphNode: {
      deps: {},
      devDeps: {},
      scripts: {
        "run-graph-node": "cd add-ons/graph-node && docker-compose up",
        "remove-graph-node": "cd add-ons/graph-node && docker-compose down",
        "clean-graph-node": "rm -rf add-ons/graph-node/data/",
        "create-graph-local": "cd add-ons/subgraph && graph create --node http://localhost:8020/ angular-web3/gravatar",
        "remove-graph-local": "cd add-ons/subgraph && graph remove --node http://localhost:8020/ angular-web3/gravatar",
        "deploy-graph-local": "cd add-ons/subgraph && graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 angular-web3/gravatar",
          },
      templates_root: [{
        source: "./files/add-ons/graph-node",
        target: "/add-ons/graph-node/",
      }],
      templates_src: [],
    },
    graphQlService:{
      deps: { 
      "@apollo/client": "^3.5.10",
      "apollo-angular": "^3.0.0",
      "graphql": "^16.3.0",},
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [{
        source: "./files/add-ons/dapp-service-graph-ql",
        target: "/app/dapp-injector/services/graph-ql",
      }],
    },
    litProtocolService: {
      deps: {
        "lit-js-sdk": "^1.1.149",
      },
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [{
        source: "./files/add-ons/dapp-service-lit-protocol",
        target: "/app/dapp-injector/services/lit-protocol",
      }],
    },
    superFluidService:{
      deps: {
        "@superfluid-finance/sdk-core": "^0.3.2",
      },
      devDeps: {},
      scripts: {},
      templates_root: [],
      templates_src: [{
        source: "./files/add-ons/dapp-service-super-fluid",
        target: "/app/dapp-injector/services/super-fluid",
      }],
    },
  },
};
