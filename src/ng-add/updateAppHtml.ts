import {Tree } from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";
import { IOPTIONS_EXTENDED } from "./schema";
import { dasherize } from "@angular-devkit/core/src/utils/strings";


export const updateAppHtml = (
  tree: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {
   

    if (_options.demoToInstall == true){

    const pathString = normalize(`/${_options.sourceRoot}/app/app.component.html`);

    const componentSelector = dasherize(_options.dappDemo)

    tree.overwrite(pathString,`<${componentSelector}></${componentSelector}>`)
    }


  return tree;
};