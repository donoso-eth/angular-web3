
import { json, normalize } from "@angular-devkit/core";
import { expect } from 'chai';
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import { findNodes, getSourceNodes, insertAfterLastOccurrence } from "../helpers/ast-utils";
import * as ts from 'typescript';
import { NoopChange } from "../helpers/change";
import { JSONFile } from "../helpers/json-file";
import { writeFileSync } from "fs";
import { getCircularReplacer } from "../helpers/circular";
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




  it("Creates lensprotocol contract entry in Contract JSON Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, dappServices:[],dappDemo: "lensProtocol" }, appTree)
      .toPromise();

    const jsonNew= new JSONFile(tree,"hardhat/contract.config.json")
    expect(jsonNew.get(['lensProtocol','name'])).to.be.equal('LensHub')
  });

  



  it("Lensprotocol should copy minimal contract", async () => {
    const tree = await schematicRunner
    .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, dappServices:[],dappDemo: "lensProtocol" }, appTree)
    .toPromise();
      expect(tree.exists(normalize("/hardhat/contracts/core/LensHub.sol"))).to.be.true;
      expect(tree.exists(normalize("/hardhat/hardhat.config.ts"))).to.be.true;
  });


  it("Lens Protocol app should include LensProtocolModule import in app.module", async () => {
    const tree = await schematicRunner
    .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, dappServices:[],dappDemo: "lensProtocol" }, appTree)
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

      const fileName = './4-lens-protocol/lens-protocol.module';
      const symbolName = 'LensProtocolModule';
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

  // it("Creates minimal contract entry in Contract JSON Config File", async () => { 
  //   const tree = await schematicRunner
  //   .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, dappServices:[],dappDemo: "minimalContract" }, appTree)
  //   .toPromise();
 
  //   const appModulePath = `/projects/schematest/src/app/dapp-injector/blockchain_wiring.ts` as string;
  //   const appModuleFile = (
  //     tree.read(normalize(appModulePath)) as Buffer
  //   ).toString("utf-8");
      
   
  //   const source_app = ts.createSourceFile(
  //     appModulePath,
  //     appModuleFile,
  //     ts.ScriptTarget.Latest,
  //     true
  //   );

  //   const fileName = './0-minimal-contract/minimal-contract.module';
  //   const symbolName = 'MinimalContractModule';
  //   const allNodes = getSourceNodes(source_app)
  //  // console.log(allNodes)
  //   const allImports = findNodes(source_app, ts.SyntaxKind.ExportKeyword);

  //   let i = 0;
  //     // const filNode = allImports.filter(node=> {
  //     //   console.log(i)
  //     //   console.log(node)
  //     //   i++
  //     // })



 

  //     // for (const myChild of child[1].getChildren()){
  //     // console.log(i,'  ',myChild.kind,' ',myChild.getText(),' ',myChild.getFullText())
  //     //   i++;
  //     // }
  // // console.log(JSON.stringify(allImports[1],getCircularReplacer()))
  // })

});
