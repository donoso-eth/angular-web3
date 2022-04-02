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

import { JSONFile } from "../helpers/json-file";
import { Console } from "console";
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
let tree: UnitTestTree;
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

    tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        {
          project: "default",
          test: true,
          demoToInstall: false,
          addOns: ["subgraph"],
          dappDemo: "minimalContract",
        },
        appTree
      )
      .toPromise();
  });

  it("Add On subgraph should create subgraph folder", async () => {
 
    expect(
      tree.exists(
        normalize(
          "/add-ons/subgraph/schema.graphql"
        )
      )
    ).to.be.true;
  });

  it("It Add subgraph scripts", async () => {
   // const packageJson = tree.read("package.json")!.toString("utf-8");

    const packageJson = new JSONFile(tree,"package.json")



    expect(packageJson.get(['scripts','create-graph-local'])).to.be.equal('cd subgraph && graph create --node http://localhost:8020/ angular-web3/your-contract')

  });

  it("It Add subgraph dependencies", async () => {
    // const packageJson = tree.read("package.json")!.toString("utf-8");
 
     const packageJson = new JSONFile(tree,"package.json")
     expect(packageJson.get(['devDependencies', "@graphprotocol/graph-cli"])).to.be.equal("^0.22.1")
 
   });

});
