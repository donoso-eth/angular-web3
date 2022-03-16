
import { normalize } from "@angular-devkit/core";
import { expect } from 'chai';
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import { findNodes, insertAfterLastOccurrence } from "../helpers/ast-utils";
import * as ts from 'typescript';
import { NoopChange } from "../helpers/change";
const collectionPath = path.join(__dirname, "../../collection.json");

const workspaceOptions = {
  name: "workspace",
  newProjectRoot: "projects",
  version: "6.0.0",
};

const appOptions: any = {
  name: "schematest",
};

let appTree: UnitTestTree;
const schematicRunner = new SchematicTestRunner("ng-add", collectionPath);

describe("Initilization", () => {
  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        "@schematics/angular",
        "workspace",
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        "@schematics/angular",
        "application",
        appOptions,
        appTree
      )
      .toPromise();


  });




  it("Creates minimal contract entry in Contract JSON Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, dappServices:[],dappDemo: "minimalContract" }, appTree)
      .toPromise();
    const contract_config_json = JSON.parse(tree.read("hardhat/contract.config.json")!.toString("utf-8"));
    expect(Object.keys(contract_config_json)).to.include('minimalContract')
  });

  

  it("No Demo app should install Minimal Module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:false, dappServices:[],dappDemo: "minimalContract" }, appTree)
      .toPromise();
 
      expect(tree.exists(normalize("/projects/schematest/src/app/0-minimal-contract/minimal-contract.module.ts"))).to.be.true;
  });


  it("No Demo app should copy minimal contract", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:false, dappServices:[],dappDemo: "minimalContract" }, appTree)
      .toPromise();
 
      expect(tree.exists(normalize("/hardhat/contracts/0-MinimalContract.sol"))).to.be.true;
  });


  it("No Demo app should include MiminalContractModule import in app.module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:false, dappServices:[],dappDemo: "minimalContract" }, appTree)
      .toPromise();
     
      const appModulePath = `/projects/schematest/src/app/app.module.ts` as string;
      const appModuleFile = (
        tree.read(normalize(appModulePath)) as Buffer
      ).toString("utf-8");
    
      const source_app = ts.createSourceFile(
        appModulePath,
        appModuleFile,
        ts.ScriptTarget.Latest,
        true
      );

      const fileName = './0-minimal-contract/minimal-contract.module';
      const symbolName = 'MinimalContractModule';
      const allImports = findNodes(source_app, ts.SyntaxKind.ImportDeclaration);
      const relevantImports = allImports.filter((node) => {
        // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
        const importFiles = node
          .getChildren()
          .filter(ts.isStringLiteral)
          .map((n) => n.text);
    
       

        return importFiles.filter((file) => file === fileName).length === 1;
      });
    
      if (relevantImports.length > 0) {
        let importsAsterisk = false;
        // imports from import file
        const imports: ts.Node[] = [];
        relevantImports.forEach((n) => {
          Array.prototype.push.apply(imports, findNodes(n, ts.SyntaxKind.Identifier));
          if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
            importsAsterisk = true;
          }
        });
    
        const importTextNodes = imports.filter((n) => (n as ts.Identifier).text === symbolName);
    
        expect(importTextNodes.length).to.equal(1)
    
      }
    

    


  });



});
