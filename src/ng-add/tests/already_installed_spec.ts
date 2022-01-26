import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";

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

describe("already Installed", () => {
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

    appTree.create(
      "/hardhat/scripts/deploy.ts",
      `const deployContracts=["helloWorldContract"]`
    );
    appTree.create("/hardhat/hardhat.config.ts", "I am already there");
    appTree.create(
      "/hardhat/contract.config.json",
      `{
      "helloWorldContract": {
          "artifactsPath": "0-HelloWorldContract.sol/HelloWorldContract.json",
          "name":"HelloWorldContract",
          "ctor":["Hello Angular Chained"],
          "jsonName":"hello_world_on_chain"
        }}`
    );
  });

  it("Is already installed", async () => {
    expect(appTree.exists("hardhat/hardhat.config.ts")).toBeTrue();
  });

  it("changes Deploy Contract", async () => {
    const existing_deploy_file = appTree.readContent(
      "hardhat/scripts/deploy.ts"
    );
    expect(existing_deploy_file).toContain(
      `const deployContracts=["helloWorldContract"]`
    );
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", configuration: "debugContract" },
        appTree
      )
      .toPromise();

    const new_deploy_file = tree.readContent("hardhat/scripts/deploy.ts");
    expect(new_deploy_file).toContain(
      `const deployContracts=["debugContract"]`
    );
  });

  it("Creates Contract JSON Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", configuration: "debugContract" },
        appTree
      )
      .toPromise();
    const config_contract = JSON.parse(
      tree.read("hardhat/contract.config.json")!.toString("utf-8")
    );
    expect(Object.keys(config_contract).length == 2).toBeTrue();
  });

  it("Should not add dependencies if already installed", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add", {}, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8")
    expect(packageJson.includes("\"hardhat\":")).toBeFalse();
  });

  // it("Hello app creates Hello world chain module", async () => {
  //   const tree = await schematicRunner
  //     .runSchematicAsync("ng-add", {}, appTree)
  //     .toPromise();
  //     expect(tree.exists("/projects/schematest/src/app/hello-world-contract/hello-world-contract.module.ts")).toBeTrue();
  // });
});
