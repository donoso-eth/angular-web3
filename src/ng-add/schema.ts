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


export type DappDemoType = "minimalContract" | "helloWorldContract" | "debugContract" | "nftContract" | "superFluid"| "lensProtocol" | "theGraph";

export type AddOnsType =  "graphQlService" | "subgraph" | "graphNode" | "ipfsService" | "litProtocolService";

export interface IOPTIONS_EXTENDED extends IOPTIONS {
    sourceRoot?: string,
    projectFound?: string
    
}