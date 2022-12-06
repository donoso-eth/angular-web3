/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import { normalize } from '@angular-devkit/core';
import {Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
 import {
   appendHtmlElementToHead,
   getProjectFromWorkspace,
   getProjectIndexFiles,
 } from '@angular/cdk/schematics';
import { IOPTIONS_EXTENDED } from './schema';

 /** Adds the Material Design fonts to the index HTML file. */
 export function updateIndexHtml(options: IOPTIONS_EXTENDED): Rule {
   return async (host: Tree) => {

    let include = "";

    if (options.uiFramework == 'primeNG'){
     
    include = ` <link id="theme-css" rel="stylesheet" type="text/css" href="assets/theme/lara-dark-teal/theme.css">`;

    }


    appendHtmlElementToHead(host,  normalize(`/${options.sourceRoot}/index.html`), include);
 
  
 
   };
 }