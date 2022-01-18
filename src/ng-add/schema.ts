/**
 * Angualr on Chain
 */
export declare interface IOPTIONS {
    /**
     * Project Path
     */
    project: string;
    /**
     * description
     */
    configuration: "minimalContract" | "helloWorldContract" | "debugContract" 

    skipInstall:boolean,

    alreadyInstalled: boolean

}

export interface IOPTIONS_EXTENDED extends IOPTIONS{
    sourceRoot?:string
  }