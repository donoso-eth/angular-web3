import { normalize } from "@angular-devkit/core";
import { Tree, Rule, url, applyTemplates, move, mergeWith, MergeStrategy, chain, apply } from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";



export const  createFiles = (host: Tree, options: IOPTIONS_EXTENDED): Rule => {
 
    const templateRules = [];
    const templateSource = apply(url("./files/common"), [
      applyTemplates({ sourceRoot:options.sourceRoot }),
      move(normalize(`/`)),
    ]);
  
    templateRules.push(
      mergeWith(templateSource, MergeStrategy.AllowCreationConflict)
    );
  
    if (!host.exists("src/typings.d.ts")) {
      const templateTypings = apply(url("./files/typings"), [
        applyTemplates({}),
        move(normalize(`/src/`)),
      ]);
      templateRules.push(mergeWith(templateTypings));
    }
  
    if (options.configuration == "helloWorld") {
      const templateApp = apply(url("./files/0-hello-world-on-chain/demo-app"), [
        applyTemplates({}),
        move(normalize(`/${options.sourceRoot}/app/dapp/`)),
      ]);
      templateRules.push(mergeWith(templateApp, MergeStrategy.Overwrite));
  
      const templateHardhat = apply(
        url("./files/0-hello-world-on-chain/hardhat"),
        [applyTemplates({ sourceRoot:options.sourceRoot }), move(normalize(`/`))]
      );
      templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
    } else if (options.configuration == "debugContract") {
      const templateApp = apply(url("./files/0-hello-world-on-chain/demo-app"), [
        applyTemplates({}),
        move(normalize(`/${options.sourceRoot}/app/dapp/`)),
      ]);
      templateRules.push(mergeWith(templateApp, MergeStrategy.Overwrite));
  
      const templateHardhat = apply(
        url("./files/0-hello-world-on-chain/hardhat"),
        [applyTemplates({ sourceRoot:options.sourceRoot}), move(normalize(`/`))]
      );
      templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
    } 
  
    return chain(templateRules);
  }