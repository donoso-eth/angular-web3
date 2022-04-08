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

describe("Add Superfluid service", () => {
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
          addOns: ["superFluidService"],
          dappDemo: "minimalContract",
        },
        appTree
      )
      .toPromise();
  });

  it("It creates superfluid service", async () => {
    expect(
      tree.exists(
        normalize(
          '/projects/schematest/src/app/dapp-injector/services/super-fluid/super-fluid-service.service.ts'
        )
      )
    ).to.be.true;
  });

  it("It Add superfluid sdk dependencies", async () => {
    // const packageJson = tree.read("package.json")!.toString("utf-8");
 
     const packageJson = new JSONFile(tree,"package.json")
     expect(packageJson.get(['dependencies',  "@superfluid-finance/sdk-core"])).to.be.equal("^0.3.2")
 
   });

});
