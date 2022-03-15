import { DappDemoType, DappServiceType } from "../schema";

export interface IDEMO {
  deps: { [key: string]: string };
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
  dappServices: Array<DappServiceType>;
}

export interface IDEMO_SERVICE extends IDEMO{}

export const configuration_options: {
  initial: IDEMO_APP;
  dappDemos: { [key in DappDemoType]: IDEMO_APP };
  dappServices: { [key in DappServiceType]: IDEMO_SERVICE };
  services: "graph-node"[];
} = {
  initial: {
    deps: {},
    scripts: {},
    dappServices: [],
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
  dappDemos: {
    minimalContract: {
      deps: {},
      scripts: {},
      dappServices: [],
      templates_root: [
        {
          source: "./files/demo-miminal-contract/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demo-miminal-contract/demo",
          target: "/app/0-minimal-contract",
        },
      ],
    },
    helloWorldContract: {
      deps: {},
      scripts: {},
      dappServices: [],
      templates_root: [
        {
          source: "./files/demo-hello-world-contract/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demo-hello-world-contract/demo",
          target: "/app/1-hello-world-contract",
        },
      ],
    },
    debugContract: {
      deps: {},
      scripts: {},
      dappServices: [],
      templates_root: [
        {
          source: "./files/demo-debug-contract/hardhat",
          target: "/hardhat/",
        },
      ],
      templates_src: [
        {
          source: "./files/demo-debug-contract/demo",
          target: "/app/2-debug-contract",
        },
      ],
    },
    nftContract: {
      deps: {},
      scripts: {},
      dappServices: ["ipfs"],
      templates_root: [
        {
          source: "./files/demo-nft-contract/hardhat",
          target: "/hardhat/",
        },
        {
          source: "./files/demo-nft-contract/custom-webpack",
          target: "",
        },
      ],
      templates_src: [
        {
          source: "./files/demo-nft-contract/demo",
          target: "/app/3-nft-contract",
        },
      ],
    },
  },
  dappServices: {
    subgraph: {deps:{}, scripts:{}, templates_root:[], templates_src:[]},
    ipfs: {deps:{}, scripts:{}, templates_root:[], templates_src:[]}},
  services: [],
};
