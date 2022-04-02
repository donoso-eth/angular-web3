import { json, normalize } from "@angular-devkit/core";
import { expect } from "chai";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import { JSONFile } from "../helpers/json-file";

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

describe("Add Onn Graph node", () => {
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
          addOns: ["graphNode"],
          dappDemo: "minimalContract",
        },
        appTree
      )
      .toPromise();
  });

  it("Add On Graph Node should create graph node folder", async () => {
 
    expect(
      tree.exists(
        normalize(
          "/add-ons/graph-node/Dockerfile"
        )
      )
    ).to.be.true;
  });

  it("It Add Graph Node subgraph scripts", async () => {
    // const packageJson = tree.read("package.json")!.toString("utf-8");
 
     const packageJson = new JSONFile(tree,"package.json")
     expect(packageJson.get(['scripts','create-graph-local'])).to.be.equal('cd subgraph && graph create --node http://localhost:8020/ angular-web3/your-contract')
 
   });

});
