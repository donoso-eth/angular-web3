import {Tree } from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";
import { IOPTIONS_EXTENDED } from "./schema";
import { dasherize } from "@angular-devkit/core/src/utils/strings";


export const updateAppHtml = (
  tree: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {
   

    if ( _options.alreadyInstalled == false){

    const pathString = normalize(`/${_options.sourceRoot}/app/app.component.html`);

    const componentSelector = _options.dappDemo == _options.contractName ? dasherize(_options.dappDemo) : dasherize(_options.contractName)

    tree.overwrite(pathString,`<${componentSelector}></${componentSelector}>`)
    }


  return tree;
};