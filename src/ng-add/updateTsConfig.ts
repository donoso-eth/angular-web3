import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { JSONFile } from "./helpers/json-file";
import { IOPTIONS_EXTENDED } from "./schema";
const JSON5 = require('json5')

export const updateTsConfig = (
  tree: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {
   

  const tsConfig =  new JSONFile(tree,"tsconfig.json")

  if (!tsConfig) {
    throw new SchematicsException("No typescrit config fie");
  } 

    const pathString = [`${_options.sourceRoot}/app/dapp-injector/index.ts`]
    tsConfig.modify(['compilerOptions','paths','angular-web3'],pathString) 
    

  return tree;
};
