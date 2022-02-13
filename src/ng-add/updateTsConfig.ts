import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";
const JSON5 = require('json5')

export const updateTsConfig = (
  tree: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {
    const myr = tree.read("tsconfig.json")!.toString("utf-8");


  const tsconfig = JSON5.parse((tree.read("tsconfig.json")!.toString("utf-8")));
  if (!tsconfig) {
    throw new SchematicsException("No typescrit config fie");
  } 


  const compilerOptions = tsconfig.compilerOptions;
  if (!compilerOptions) {
    throw new SchematicsException("No Compiler Options");
  } 


  const tsconfig_path = compilerOptions.paths;
  if (tsconfig_path == undefined) {
    compilerOptions["paths"] = {}
  }
  compilerOptions["paths"]['angular-web3'] = ["src/app/dapp-injector/index.ts"]
  const tsConfigString = JSON.stringify(tsconfig)
  tree.overwrite("tsconfig.json",tsConfigString)

  return tree;
};
