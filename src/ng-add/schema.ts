/**
 * Angualr on Chain
 */
export declare interface IOPTIONS {

    /**
     * Demo App;
     */
    demoToInstall: boolean;
    /**
     * description
     */
    dappDemo: DappDemoType ;
    /**
     * Dapp Services to be included
     */
    dappServices: Array<DappServiceType>;
    /**
     * Services Infrastructrue to install
     */
    services: "graph-node"[];
    /**
     * skipInstall
     */
    skipInstall: boolean;
    /**
     * Am i in test?
     */
    test?: boolean;
    /**
     * alreadyInstalled
     */
    alreadyInstalled?: boolean;

    /**
     * reset
     */
    reset?: boolean;

}


export type DappDemoType = "minimalContract" | "helloWorldContract" | "debugContract" | "nftContract" | "lensProtocol";

export type DappServiceType = "subgraph" | "ipfs";

export interface IOPTIONS_EXTENDED extends IOPTIONS {
    sourceRoot?: string,
    projectFound?: string
    
}