/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import { normalize } from '@angular-devkit/core';
import {externalSchematic, Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
import { IOPTIONS_EXTENDED } from './schema';

 /** Adds the Material Design fonts to the index HTML file. */

 
 export const  runExternal = (_options:IOPTIONS_EXTENDED): Rule => {
  return (tree: Tree) => {
    console.log(_options.projectFound)
    externalSchematic("@angular/material", "ng-add", { project:_options.projectFound,
      animations: true, theme: "indigo-pink",  typography: false});
    return tree;
  };
}