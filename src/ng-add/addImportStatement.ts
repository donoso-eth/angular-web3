import { normalize } from "@angular-devkit/core";
import { SchematicsException, Tree } from "@angular-devkit/schematics";
import ts = require("typescript");
import { IOPTIONS_EXTENDED } from "./schema";
import {
  addImportToModule,
  insertImport,
  addProviderToModule,
} from "@schematics/angular/utility/ast-utils";
import { Change, InsertChange } from "@schematics/angular/utility/change";

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
  
  //// Importing Feature module
  let featureName;
  let featurePath;
  if (_options.dappDemo == "minimalContract") {
    featureName = "MinimalContractModule";
    featurePath =
      "./0-minimal-contract/minimal-contract.module";
  } else if (_options.dappDemo == "helloWorldContract") {
    featureName = "HelloWorldContractModule";
    featurePath =
      "./1-hello-world-contract/hello-world-contract.module";
  } else if (_options.dappDemo == "debugContract") {
    featureName = "DebugContractModule";
    featurePath = "./2-debug-contract/debug-contract.module";
  } else if (_options.dappDemo == "nftContract") {
    featureName = "NftContractModule";
    featurePath = "./3-nft-contract/nft-contract.module";
  } else if (_options.dappDemo == "lensProtocol") {
    featureName = "LensProtocolModule";
    featurePath = "./4-lens-protocol/lens-protocol.module";
  } else if (_options.dappDemo == "theGraph") {
    featureName = "TheGraphDemoModule";
    featurePath = "./5-the-graph/the-graph-demo.module";
  }  else if (_options.dappDemo == "superFluid") {
    featureName = "SuperFluidDemoModule";
    featurePath = "./6-super-fluid/super-fluid-demo.module";
  }else {
    return tree;
  }

  const appModulePath = `/${_options.sourceRoot}/app/app.module.ts` as string;

  const appModuleFile = (
    tree.read(normalize(appModulePath)) as Buffer
  ).toString("utf-8");

  if (!appModuleFile) {
    throw new SchematicsException("app.module.ts not found");
  }
 // const result = new AddToModuleContext();


  const source_app = ts.createSourceFile(
    appModulePath,
    appModuleFile,
    ts.ScriptTarget.Latest,
    true
  );



  let importsFeature:Change[] =  addImportToModule(
    source_app,
    appModulePath,
    featureName,
    featurePath,
  )

  const importReducer  = insertImport(
    source_app,
    appModulePath,
    "we3ReducerFunction",
    "angular-web3"
  )

  const importStore:Change[] =  addImportToModule(
    source_app,
    appModulePath,
    'StoreModule.forRoot({web3: we3ReducerFunction}),',
    '@ngrx/store',
  )


  const importDappInjector:Change[] =  addImportToModule(
    source_app,
    appModulePath,
    "DappInjectorModule.forRoot({wallet:'local', defaultNetwork:'localhost'})",
    "./dapp-injector/dapp-injector.module",
  )

  // const importProvider:Change[] = addProviderToModule(
  //   source_app,
  //   appModulePath,
  //   'blockchain_providers',
  //   './blockchain_wiring'

  // )
    // ============ Manual Angular Material installation  ========================
    if (_options.demoToInstall == true){
      const importDappBrowserAnimations:Change[] =  addImportToModule(
        source_app,
        appModulePath,
        'BrowserAnimationsModule',
        '@angular/platform-browser/animations',
      )
      importsFeature= importsFeature.concat(importDappBrowserAnimations)
    }


  const importRecorder = tree.beginUpdate(appModulePath);
  for (const change of importsFeature.concat(importDappInjector,importStore,[importReducer])) {
    if (change instanceof InsertChange) {
      importRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(importRecorder);

  return tree;
};
