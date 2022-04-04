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

describe("Add on Graphql", () => {
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
          addOns: ["graphQlService"],
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
          '/projects/schematest/src/app/dapp-injector/services/graph-ql/graph-ql.service.ts'
        )
      )
    ).to.be.true;
  });




});
