import {Tree } from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";
import { IOPTIONS_EXTENDED } from "./schema";
import { dasherize } from "@angular-devkit/core/src/utils/strings";


export const updatePolyfills = (
  tree: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {
   

    if ( _options.alreadyInstalled == false){

    const pathString = normalize(`/${_options.sourceRoot}/polyfills.ts`);


    const currentPolyfills = tree.read(pathString)

    tree.overwrite(pathString, currentPolyfills + `
    (window as any).global = window;
    global.Buffer = global.Buffer || require('buffer').Buffer;
    global.process = require('process');`)
    }


  return tree;
};