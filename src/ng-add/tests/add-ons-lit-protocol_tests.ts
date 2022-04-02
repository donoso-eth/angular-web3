import { json, normalize } from "@angular-devkit/core";
import { expect } from "chai";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";

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

describe("Add On Lit protocol", () => {
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
          addOns: ["litProtocolService"],
          dappDemo: "minimalContract",
        },
        appTree
      )
      .toPromise();
  });

  it("Add On Lit protocol should create Lit protocol Folder", async () => {


    expect(
      tree.exists(
        normalize(
          '/projects/schematest/src/app/dapp-injector/services/lit-protocol/lit-protocol.service.ts'
        )
      )
    ).to.be.true;
  });

  
  it("It Add subgraph dependencies", async () => {
    // const packageJson = tree.read("package.json")!.toString("utf-8");
 
     const packageJson = new JSONFile(tree,"package.json")
     expect(packageJson.get(['dependencies',  "lit-js-sdk",])).to.be.equal("^1.1.149")
 
   });

});
