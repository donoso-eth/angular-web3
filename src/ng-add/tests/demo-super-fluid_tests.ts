import { json, normalize } from "@angular-devkit/core";
import { expect } from "chai";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import {
  findNodes,
  getSourceNodes,
  insertAfterLastOccurrence,
} from "../helpers/ast-utils";
import * as ts from "typescript";
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

let tree: UnitTestTree;

describe("Creates SuperFluid Demo", () => {
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

    tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        {
          project: "default",
          test: true,
          demoToInstall: true,
          addOns: [],
          dappDemo: "superFluid",
        },
        appTree
      )
      .toPromise();
  });

  it("Superfluid entry in Contract JSON Config File", async () => {
    const jsonNew = new JSONFile(tree, "hardhat/contract.config.json");

    expect(jsonNew.get(["superFluid", "name"])).to.be.equal(
      "SuperApp"
    );
  });

  it("Super Fluid Demo app should install SuperFluid Module", async () => {

    expect(
      tree.exists(
        normalize(
          "/projects/schematest/src/app/6-super-fluid/super-fluid-demo.module.ts"
        )
      )
    ).to.be.true;
  });

  it("Super Fluid Demo should copy superApp registry contract", async () => {
    expect(tree.exists(normalize("/hardhat/contracts/SuperApp.sol")))
      .to.be.true;
  });

  it("Super Fluid Demo should include SuperFluidDemoModule import in app.module", async () => {
    const appModulePath =
      `/projects/schematest/src/app/app.module.ts` as string;
    const appModuleFile = (
      tree.read(normalize(appModulePath)) as Buffer
    ).toString("utf-8");

    const source_app = ts.createSourceFile(
      appModulePath,
      appModuleFile,
      ts.ScriptTarget.Latest,
      true
    );

    const fileName = "./6-super-fluid/super-fluid-demo.module"
    const symbolName = "SuperFluidDemoModule";
    const allImports = findNodes(source_app, ts.SyntaxKind.ImportDeclaration);

    const relevantImports = allImports.filter((node) => {
      const importFiles = node
        .getChildren()
        .filter(ts.isStringLiteral)
        .map((n) => n.text);

      return importFiles.filter((file) => file === fileName).length === 1;
    });



    expect(relevantImports.length).to.be.gt(0)

    if (relevantImports.length > 0) {
      let importsAsterisk = false;
      // imports from import file
      const imports: ts.Node[] = [];
      relevantImports.forEach((n) => {
        Array.prototype.push.apply(
          imports,
          findNodes(n, ts.SyntaxKind.Identifier)
        );
        if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
          importsAsterisk = true;
        }
      });

      const importTextNodes = imports.filter(
        (n) => (n as ts.Identifier).text === symbolName
      );
  
      expect(importTextNodes.length).to.equal(1);
    } 
  });


  it("it Add Superfluid sdk scripts", async () => {

    //  const packageJson = new JSONFile(tree,"package.json")
    //  expect(packageJson.get(['scripts', "lit-js-sdk"])).to.be.equal("^1.1.149")
 
   });
  

  it("It Add Superfluid sdk dependencies", async () => {

     const packageJson = new JSONFile(tree,"package.json");
     expect(packageJson.get(['dependencies', "@superfluid-finance/sdk-core"])).to.be.equal("^0.3.2")
 
   });



   it("It Add Superfluid and replace hardhat config with fork", async () => {

    const hardhat_config_file = tree.readContent("hardhat/hardhat.config.ts");

    expect(hardhat_config_file).to.contain("url: `${ALCHEMY_URL}`,");

  });

});
