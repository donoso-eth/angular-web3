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
    tsConfig.modify(['compilerOptions','paths',"crypto"],"./node_modules/crypto-browserify")
    tsConfig.modify(['compilerOptions','paths',"stream"],"./node_modules/stream-browserify"),
    tsConfig.modify(['compilerOptions','paths',"assert"],"./node_modules/assert"),
    tsConfig.modify(['compilerOptions','paths',"http"],"./node_modules/stream-http"),
    tsConfig.modify(['compilerOptions','paths',"https"],"./node_modules/https-browserify"),
    tsConfig.modify(['compilerOptions','paths',"os"],"./node_modules/os-browserify"),
    tsConfig.modify(['compilerOptions','paths',"url"],"./node_modules/url")

    tsConfig.modify(['compilerOptions', 'skipLibCheck'],true)

    tsConfig.modify(['compilerOptions', 'noPropertyAccessFromIndexSignature'],false)

  return tree;
};
