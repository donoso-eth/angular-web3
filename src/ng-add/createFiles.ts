import { normalize } from "@angular-devkit/core";
import { Tree, Rule, url, applyTemplates, move, mergeWith, MergeStrategy, chain, apply } from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";



export const  createFiles = (host: Tree, options: IOPTIONS_EXTENDED): Rule => {

    const templateRules = [];

    ///////////////////////////////////////////////////////////
    //////////////////// COMMON FILES /////////////////////////
    ///////////////////////////////////////////////////////////
    if (options.alreadyInstalled == false) {
    const templateCommonHardhat = apply(url("./files/common/hardhat"), [
      applyTemplates({ sourceRoot:options.sourceRoot }),
      move(normalize(`/hardhat/`)),
    ]);
  
    templateRules.push(
      mergeWith(templateCommonHardhat, MergeStrategy.Overwrite)
    );
  
    const templateCommonApp = apply(url("./files/common/demo-app"), [
      applyTemplates({ sourceRoot:options.sourceRoot }),
      move(normalize(normalize(`/${options.sourceRoot}/app/dapp/`))),
    ]);
  
    templateRules.push(
      mergeWith(templateCommonApp, MergeStrategy.Overwrite)
    );

    }
    if (options.configuration == "minimalContract") {
      const templateApp = apply(url("./files/0-minimal-contract/demo-app"), [
        applyTemplates({}),
        move(normalize(`/${options.sourceRoot}/app/dapp/demos/`)),
      ]);
      templateRules.push(mergeWith(templateApp, MergeStrategy.Overwrite));
  
      const templateHardhat = apply(
        url("./files/0-minimal-contract/hardhat"),
        [applyTemplates({ sourceRoot:options.sourceRoot }), move(normalize(`/hardhat/`))]
      );
      templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
    } else if (options.configuration == "helloWorld") {
      const templateApp = apply(url("./files/1-hello-world-on-chain/demo-app"), [
        applyTemplates({}),
        move(normalize(`/${options.sourceRoot}/app/dapp/demos/`)),
      ]);
      templateRules.push(mergeWith(templateApp, MergeStrategy.Overwrite));
  
      const templateHardhat = apply(
        url("./files/1-hello-world-on-chain/hardhat"),
        [applyTemplates({ sourceRoot:options.sourceRoot }), move(normalize(`/hardhat/`))]
      );
      templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
    } else if (options.configuration == "debugContract") {

        const templateApp = apply(url("./files/2-contract-debug/demo-app"), [
        applyTemplates({}),
        move(normalize(`/${options.sourceRoot}/app/dapp/demos/`)),
      ]);
      templateRules.push(mergeWith(templateApp, MergeStrategy.Overwrite));
  
      const templateHardhat = apply(
        url("./files/2-contract-debug/hardhat"),
        [applyTemplates({ sourceRoot:options.sourceRoot}), move(normalize(`/hardhat/`))]
      );
      templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
    } 
    
    if (options.configuration !== "minimalContract"){
      const templateCommonDemo = apply(url("./files/demo/demo-app"), [
        applyTemplates({ sourceRoot:options.sourceRoot }),
        move(normalize(normalize(`/${options.sourceRoot}/app/dapp/`))),
      ]);
      templateRules.push(
        mergeWith(templateCommonDemo, MergeStrategy.Overwrite)
      );
    }

    if (!host.exists("src/typings.d.ts")) {
      const templateTypings = apply(url("./files/typings"), [
        applyTemplates({}),
        move(normalize(`/src/`)),
      ]);
      templateRules.push(mergeWith(templateTypings));
    }
  

    return chain(templateRules);
  }