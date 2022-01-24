import { normalize } from "@angular-devkit/core";
import { SchematicsException, Tree } from "@angular-devkit/schematics";
import ts = require("typescript");
import { IOPTIONS_EXTENDED } from "./schema";
import {
  addImportToModule,
  insertImport,
} from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";

class AddToModuleContext {
  // source of the module file
  source: ts.SourceFile;

  // the relative path that points from
  // the module file to the component file
  relativePath: string;

  // name of the component class
  classifiedName: string;
}

export const addImport = (tree: Tree, _options: IOPTIONS_EXTENDED): Tree => {
  let importName;
  let importPath;
  if (_options.configuration == "minimalContract") {
    importName = "MinimalContractModule";
    importPath =
      "./dapp-demos/0-minimal-contract/minimal-contract.module";
  } else if (_options.configuration == "helloWorldContract") {
    importName = "HelloWorldContractModule";
    importPath =
      "./dapp-demos/1-hello-world-contract/hello-world-contract.module";
  } else if (_options.configuration == "debugContract") {
    importName = "DebugContractModule";
    importPath = "./dapp-demos/2-debug-contract/debug-contract.module";
  } else {
    return tree;
  }

  const appModulePath = `/${_options.sourceRoot}/app/app.module.ts` as string;

  const appModuleFile = (
    tree.read(normalize(appModulePath)) as Buffer
  ).toString("utf-8");

  if (!appModuleFile) {
    throw new SchematicsException("app.module.ts not found");
  }
  const result = new AddToModuleContext();
  result.source = ts.createSourceFile(
    appModulePath,
    appModuleFile,
    ts.ScriptTarget.Latest,
    true
  );
  result.relativePath = importPath;
  result.classifiedName = importName;
  const importsChanges = addImportToModule(
    result.source,
    appModulePath,
    result.classifiedName,
    result.relativePath
  );
  const importRecorder = tree.beginUpdate(appModulePath);
  for (const change of importsChanges) {
    if (change instanceof InsertChange) {
      importRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(importRecorder);
  return tree;
};
