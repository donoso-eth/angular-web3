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
     * Add Ons to be included
     */
    addOns: Array<AddOnsType>;
   
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

export type AddOnsType = "subgraph" | "ipfs" | "graph-node";

export interface IOPTIONS_EXTENDED extends IOPTIONS {
    sourceRoot?: string,
    projectFound?: string
    
}