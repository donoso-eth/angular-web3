/**
 * Angualr on Chain
 */
export declare interface IOPTIONS {

    /**
     * Demo App
     */
    demoToInstall: boolean;
    /**
     * description
     */
    dappDemo: "minimalContract" | "helloWorldContract" | "debugContract" | "nftContract";
    /**
     * Dapp Services to be included
     */
    dappServices: ("subgraph" | "ipfs")[];
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




export interface IOPTIONS_EXTENDED extends IOPTIONS {
    sourceRoot?: string,
    projectFound?: string
    
}