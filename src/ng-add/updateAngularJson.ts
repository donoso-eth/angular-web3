import { Tree } from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";
import { IOPTIONS_EXTENDED } from "./schema";
import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { JSONFile } from "./helpers/json-file";

export const updateAngularJson = (
  tree: Tree,
  _options: IOPTIONS_EXTENDED
): Tree => {

  if (_options.uiFramework == 'primeNG'){
  let workspaceConfig = new JSONFile(tree, "angular.json");

  let scripts:any[] = [];
  // workspaceConfig.get([
  //   "projects",
  //   _options.projectFound as string,
  //   "architect",
  //   "build",
  //   "scripts",
  // ]) as string[];


  scripts = scripts.concat([
    "node_modules/prismjs/prism.js",
    "node_modules/prismjs/components/prism-typescript.js",
  ]);

  workspaceConfig.modify(
    [
      "projects",
      _options.projectFound as string,
      "architect",
      "build",
      "scriptas",
    ],
    scripts
  );

  tree.overwrite("angular.json", JSON.stringify(workspaceConfig));
  }
  return tree;
};
