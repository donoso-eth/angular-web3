import { normalize } from "@angular-devkit/core";
import {
  Tree,
  Rule,
  url,
  applyTemplates,
  move,
  mergeWith,
  MergeStrategy,
  chain,
  apply,
  SchematicContext,
} from "@angular-devkit/schematics";
import { configuration_options } from "./config/options.configuration";
import { IOPTIONS_EXTENDED } from "./schema";

import { classify, dasherize, camelize, underscore,capitalize } from '@angular-devkit/core/src/utils/strings';
import { getOptionskeys } from "./helpers/getOptionsKeys";
import { contract_config } from "./config/contract.config";
const stringUtils = {classify, dasherize, camelize, underscore,capitalize };

export const createFiles = (host: Tree, _options: IOPTIONS_EXTENDED,  context: SchematicContext): Rule => {

  const demoName = contract_config[_options.dappDemo].name
  const contractName = _options.contractName == undefined ? demoName : _options.contractName;


  _options.contractName  = contractName;
  let toInstallKeys = getOptionskeys(_options, context)
 


  const templateRules:any[] = [];

  let templates_src:Array<{source:string, target:string}> =[];
  let templates_root:Array<{source:string, target:string}> =[];
  

  toInstallKeys.forEach(ele=> {
    
    templates_root = templates_root.concat(ele.templates_root);
    templates_src = templates_src.concat(ele.templates_src)
  })



/// ============ components common for demo apps ================= 
// if (_options.demoToInstall== true){
//     templates_src.push(     {
//       source: "./files/demos/components",
//       target: "/app/dapp-components",
//     },)
// }
  

/// ============  demo apps ================= 


  const options_file_replacements = { 
    ...stringUtils,
    sourceRoot: _options.sourceRoot , 
    contractCode:_options.dappDemo,
    contractName,
    metadata:_options.dappDemo + 'Metadata' ,
    jsonFile: underscore(dasherize(_options.dappDemo)),
    demoName }




  for (const rootFile of templates_root) {
    const templateRoot= apply(url(rootFile.source), [
      applyTemplates(options_file_replacements),
      move(normalize(rootFile.target)),
    ]);

    templateRules.push(
      mergeWith(templateRoot, MergeStrategy.Overwrite)
    );
  }

  for (const srcFile of templates_src) {
    const templateSrc = apply(url(srcFile.source), [
      applyTemplates(options_file_replacements),
      move(normalize(`/${_options.sourceRoot}${srcFile.target}`)),
    ]);

    templateRules.push(
      mergeWith(templateSrc, MergeStrategy.AllowCreationConflict)
    );
  }




    const templateCommonHardhat = apply(url("./files/common/hardhat"), [
      applyTemplates({ sourceRoot: _options.sourceRoot ,  contractName, contractCode:_options.dappDemo }),
      move(normalize(`/hardhat/`)),
    ]);

   // templateRules.push(      mergeWith(templateCommonHardhat, MergeStrategy.Overwrite)    );

  const templateInjector = apply(url("./files/common/dapp/dapp-injector"), [
    applyTemplates({ 
      sourceRoot: _options.sourceRoot, 
      metadata:_options.dappDemo + 'Metadata',  
      demoName, contractName }),
    move(normalize(normalize(`/${_options.sourceRoot}/app/dapp-injector`))),
  ]);

  //templateRules.push(mergeWith(templateInjector, MergeStrategy.Overwrite));

  const templateCommonApp = apply(url("./files/common/dapp/app"), [
    applyTemplates({  ...stringUtils,contractCode:_options.dappDemo, contractName }),
    move(normalize(normalize(`/${_options.sourceRoot}/app/`))),
  ]);

  //templateRules.push(mergeWith(templateCommonApp, MergeStrategy.Overwrite));



  return chain(templateRules);
};
