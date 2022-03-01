// /**
//  * @license
//  * Copyright Google LLC All Rights Reserved.
//  *
//  * Use of this source code is governed by an MIT-style license that can be
//  * found in the LICENSE file at https://angular.io/license
//  */

//  import { normalize } from '@angular-devkit/core';
// import {Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
//  import {
//    appendHtmlElementToHead,
//    getProjectFromWorkspace,
//    getProjectIndexFiles,
//  } from '@angular/cdk/schematics';
// import { IOPTIONS_EXTENDED } from './schema';

//  /** Adds the Material Design fonts to the index HTML file. */
//  export function addFontsToIndex(options: IOPTIONS_EXTENDED): Rule {
//    return async (host: Tree) => {

 
//      const preconnect = `<link rel="preconnect" href="https://fonts.gstatic.com">`;
//      const fonts = [
//        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap',
//        'https://fonts.googleapis.com/icon?family=Material+Icons',
//      ];
 
  
//        appendHtmlElementToHead(host,  normalize(`/${options.sourceRoot}/index.html`), preconnect);
 
//        fonts.forEach(font => {
//          appendHtmlElementToHead(host,  normalize(`/${options.sourceRoot}/index.html`), `<link href="${font}" rel="stylesheet">`);
//        });
 
//    };
//  }