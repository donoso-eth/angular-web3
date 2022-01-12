import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import { create } from "domain";
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

    appTree.create(
      "/hardhat/scripts/deploy.ts",
      `const deployContracts=["helloWorld"]`
    );
    appTree.create("/hardhat/hardhat.config.ts", "I am already there");
    appTree.create(
      "/hardhat/contract.config.json",
      `{
      "helloWorld": {
          "artifactsPath": "0-HelloWorldOnChain.sol/HelloWorldOnChain.json",
          "name":"HelloWorldOnChain",
          "ctor":"Hello Angular Chained",
          "jsonName":"hello_world_on_chain"
        }}`
    );
  });

  it("Is already installed", async () => {
    expect(appTree.exists("hardhat/hardhat.config.ts")).toBeTrue();
  });

  it("changes Deploy Contract", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", configuration: "debugContract" },
        appTree
      )
      .toPromise();

    expect(tree.files.length).toBeGreaterThan(2);
  });

  it("Creates Hardhat Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add", {}, appTree)
      .toPromise();

    expect(tree.exists("hardhat/hardhat.config.ts")).toBeTrue();
  });

  it("Hardhat Config File contains assets path", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add", {}, appTree)
      .toPromise();
    const hardhat_config_file = tree.readContent("hardhat/hardhat.config.ts");
    expect(hardhat_config_file).toContain("src/assets");
  });

  it("Add dependencies", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add", {}, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8");

    expect(packageJson).toContain("hardhat");
  });

  it("Add scripts", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add", {}, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8");

    expect(packageJson).toContain(
      `"compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile"`
    );
  });

  // it("Hello app creates Hello world chain module", async () => {
  //   const tree = await schematicRunner
  //     .runSchematicAsync("ng-add", {}, appTree)
  //     .toPromise();
  //     expect(tree.exists("/projects/schematest/src/app/hello-world-on-chain/hello-world-on-chain.module.ts")).toBeTrue();
  // });
});
