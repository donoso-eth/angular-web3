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
} from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";

export const createFiles = (host: Tree, options: IOPTIONS_EXTENDED): Rule => {
  const templateRules = [];

  ///////////////////////////////////////////////////////////
  //////////////////// COMMON FILES /////////////////////////
  ///////////////////////////////////////////////////////////
  if (options.alreadyInstalled == false) {
    const templateCommonHardhat = apply(url("./files/common/hardhat"), [
      applyTemplates({ sourceRoot: options.sourceRoot }),
      move(normalize(`/hardhat/`)),
    ]);

    templateRules.push(
      mergeWith(templateCommonHardhat, MergeStrategy.Overwrite)
    );
  }

  const templateCommonApp = apply(url("./files/common/dapp/common"), [
    applyTemplates({ sourceRoot: options.sourceRoot }),
    move(normalize(normalize(`/${options.sourceRoot}/app/dapp-injector`))),
  ]);

  templateRules.push(mergeWith(templateCommonApp, MergeStrategy.Overwrite));

  if (options.configuration == "minimalContract") {
    const templateApp = apply(url("./files/0-minimal-contract/dapp"), [
      applyTemplates({}),
      move(normalize(`/${options.sourceRoot}/app/dapp-demos/`)),
    ]);
    templateRules.push(
      mergeWith(templateApp, MergeStrategy.AllowCreationConflict)
    );

    const templateHardhat = apply(url("./files/0-minimal-contract/hardhat"), [
      applyTemplates({ sourceRoot: options.sourceRoot }),
      move(normalize(`/hardhat/`)),
    ]);
    templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
  } else if (options.configuration == "helloWorldContract") {
    const templateApp = apply(url("./files/1-hello-world-contract/dapp"), [
      applyTemplates({}),
      move(normalize(`/${options.sourceRoot}/app/dapp-demos/`)),
    ]);
    templateRules.push(
      mergeWith(templateApp, MergeStrategy.AllowCreationConflict)
    );

    const templateHardhat = apply(
      url("./files/1-hello-world-contract/hardhat"),
      [
        applyTemplates({ sourceRoot: options.sourceRoot }),
        move(normalize(`/hardhat/`)),
      ]
    );
    templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
  } else if (options.configuration == "debugContract") {
    const templateApp = apply(url("./files/2-debug-contract/dapp"), [
      applyTemplates({}),
      move(normalize(`/${options.sourceRoot}/app/dapp-demos/`)),
    ]);
    templateRules.push(
      mergeWith(templateApp, MergeStrategy.AllowCreationConflict)
    );

    const templateHardhat = apply(url("./files/2-debug-contract/hardhat"), [
      applyTemplates({ sourceRoot: options.sourceRoot }),
      move(normalize(`/hardhat/`)),
    ]);
    templateRules.push(mergeWith(templateHardhat, MergeStrategy.Overwrite));
  }

  if(options.configuration !== 'minimalContract'){
    const templateApp = apply(url("./files/common-demo/dapp"), [
      applyTemplates({}),
      move(normalize(`/${options.sourceRoot}/app/dapp-injector/`)),
    ]);
    templateRules.push(
      mergeWith(templateApp, MergeStrategy.AllowCreationConflict)
    );
  }


    
  if (host.exists("src/app/dapp-injector/components/index.ts")) {
    const templateIndex = apply(url("./files/common/dapp/index/component"), [
      applyTemplates({}),
      move(normalize(`/src/app/dapp-injector/`)),
    ]);
    templateRules.push(mergeWith(templateIndex ,MergeStrategy.Overwrite));
  } else {
    const templateIndex  = apply(url("./files/common/dapp/index/wocomponent"), [
      applyTemplates({}),
      move(normalize(`/src/app/dapp-injector/`)),
    ]);
    templateRules.push(mergeWith(templateIndex ,MergeStrategy.Overwrite));
  }



  if (!host.exists("src/typings.d.ts")) {
    const templateTypings = apply(url("./files/typings"), [
      applyTemplates({}),
      move(normalize(`/src/`)),
    ]);
    templateRules.push(mergeWith(templateTypings));
  }

  return chain(templateRules);
};
