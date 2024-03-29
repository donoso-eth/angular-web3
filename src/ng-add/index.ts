import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from "@angular-devkit/schematics";



import { IOPTIONS_EXTENDED } from "./schema";
import { createFiles } from "./createFiles";
import { addAndinstallDependencies } from "./addAndInstallDependencies";
import { adScriptsToPackageJson } from "./addScriptsToPackageJson";
import { contract_config } from "./config/contract.config";
import { addImport } from "./addImportStatement";

import { updateTsConfig } from "./updateTsConfig";
import { addNgrx, runExternal } from "./runExternal";
import { setupOptions } from "./0-setupOptions";
import { addFontsToIndex } from "./addFonts";
import { updateAppHtml } from "./updateAppHtml";
import { updatePolyfills } from "./updatePolyfills";
import { updateIndexHtml } from "./updateIndexHtml";
import { updateAngularJson } from "./updateAngularJson";
import { updateStyles } from "./updateStyles";
import { toUnder } from "./helpers/misc";
import { camelize, capitalize, dasherize } from "@angular-devkit/core/src/utils/strings";

/** Adds a package to the package.json in the given host tree. */

const changeContractConfig = (
  host: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {

  const contractConfig: any = contract_config;
  if (_options.alreadyInstalled == false) {

    if (_options.contractName !== _options.dappDemo){

      const jsonName = camelize(_options.contractName) ;
      let artifactsPath = `${capitalize(_options.contractName)}.sol/${capitalize(_options.contractName)}.json`
      let obj =  {
        "artifactsPath": artifactsPath,
      "name": capitalize(_options.contractName),
      "ctor": [],
      "jsonName": dasherize(_options.contractName)
    }
    const contractConfigString = JSON.stringify({
      [jsonName]: obj,
    });
    host.create("hardhat/contract.config.json", contractConfigString);

    } else {
      const contractConfigString = JSON.stringify({
        [_options.dappDemo]: contractConfig[_options.dappDemo],
      });
  
      host.create("hardhat/contract.config.json", contractConfigString);
    }

  
  } else {
    let alreadyConfig;
    alreadyConfig = JSON.parse(
      host.read("hardhat/contract.config.json")!.toString("utf-8")
    );

    let project;

    if (!alreadyConfig) {
      throw new SchematicsException(
        "If project does exist, I should not be here"
      );
    }

   
 
      alreadyConfig[_options.dappDemo] =
      contractConfig[_options.dappDemo];
    

    const contractConfigString = JSON.stringify(alreadyConfig);

    host.overwrite("hardhat/contract.config.json", contractConfigString);
  }
  return host;
};

const doTheLogs = (
  host: Tree,
  _options: IOPTIONS_EXTENDED,
  context: SchematicContext
): Tree => {
  context.logger.info("");
  context.logger.warn(
    `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
  );
  context.logger.warn(
    `Don't forget to add TO BLBLBLBL`
  );

  context.logger.warn(
    `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
  );
  context.logger.info("");


  return host;
};

export function ngAdd(_options: IOPTIONS_EXTENDED): Rule {
  return chain([
    async (tree: Tree, _context: SchematicContext) => {
      await setupOptions(tree, _options, _context);
    },

    
    (tree: Tree, _context: SchematicContext) => {
      changeContractConfig(tree, _options);
    },
    (tree: Tree, _context: SchematicContext) => {
      return createFiles(tree, _options,_context);
   
    },
    (tree: Tree, _context: SchematicContext) => {
  
      return addImport(tree, _options);
    },
    (tree: Tree, _context: SchematicContext) => {
      _context.logger.warn(
        `111 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
      );
      return updateAppHtml(tree, _options);
    },

    (tree: Tree, _context: SchematicContext) => {
      return updateTsConfig(tree, _options);
    },

    // (tree: Tree, _context: SchematicContext) => {
    //   return updatePolyfills(tree, _options);
    // },
    (tree: Tree, _context: SchematicContext) => {
      return updateAngularJson(tree, _options);
    },


    updateIndexHtml(_options),
    
    (tree: Tree, _context: SchematicContext) => {
    return updateStyles(tree,_options);
    },
    

    adScriptsToPackageJson(_options),
    addFontsToIndex(_options),

    
    // addNgrx(_options),
    // runExternal(_options),
    // externalSchematic("@angular/material", "ng-add", { project:_options.projectFound,
    //   animations: true, theme: "indigo-pink",  typography: false}),
    //externalSchematic("@ng-bootstrap/ng-bootstrap", "ng-add", { project:_options.projectFound}),


    addAndinstallDependencies(_options),
    (tree: Tree, _context: SchematicContext) => {
      return doTheLogs(tree, _options, _context);
    }
  ]);
}


