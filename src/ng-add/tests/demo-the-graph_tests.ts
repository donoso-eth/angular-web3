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

describe("Creates a The Graph Demo", () => {
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
          dappDemo: "theGraph",
        },
        appTree
      )
      .toPromise();
  });

  it("The Graph contract entry in Contract JSON Config File", async () => {
    const jsonNew = new JSONFile(tree, "hardhat/contract.config.json");

    expect(jsonNew.get(["theGraph", "name"])).to.be.equal(
      "Gravity"
    );
  });

  it("The Graph Demo app should install The Grpah Module", async () => {

    expect(
      tree.exists(
        normalize(
          "/projects/schematest/src/app/5-the-graph/the-graph-demo.module.ts"
        )
      )
    ).to.be.true;
  });

  it("The Graph Demo should copy minimal contract", async () => {
    expect(tree.exists(normalize("/hardhat/contracts/Gravity.sol")))
      .to.be.true;
  });

  it("The Graph Demo  should include TheGraphModule import in app.module", async () => {
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

    const fileName = "./5-the-graph/the-graph-demo.module.ts";
    const symbolName = "TheGraphDemoModule";
    const allImports = findNodes(source_app, ts.SyntaxKind.ImportDeclaration);
    const relevantImports = allImports.filter((node) => {
      const importFiles = node
        .getChildren()
        .filter(ts.isStringLiteral)
        .map((n) => n.text);

      return importFiles.filter((file) => file === fileName).length === 1;
    });

    console.log(relevantImports.length)

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
        console.log(importTextNodes)
      expect(importTextNodes.length).to.equal(1);
    } 
  });
});
