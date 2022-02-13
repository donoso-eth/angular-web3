
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

  it("Should not be already installed", async () => {
    expect(appTree.exists("hardhat/hardhat.config.ts")).toBeFalse();
  });

  it("works", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", configuration: "helloWorldContract" },
        appTree
      )
      .toPromise();

    expect(tree.files.length).toBeGreaterThan(2);
  });

  it("Creates Hardhat Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", configuration: "helloWorldContract" }, appTree)
      .toPromise();

    expect(tree.exists("hardhat/hardhat.config.ts")).toBeTrue();
  });


  it("Creates Contract JSON Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", configuration: "helloWorldContract" }, appTree)
      .toPromise();

    expect(tree.exists("hardhat/contract.config.json")).toBeTrue();
  });


  it("Hardhat Config File contains assets path", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", configuration: "helloWorldContract" }, appTree)
      .toPromise();
    const hardhat_config_file = tree.readContent("hardhat/hardhat.config.ts");

    expect(hardhat_config_file).toContain("src/assets");
  });

  it("Should add Injector module ", async () => {

    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", configuration: "helloWorldContract" }, appTree)
      .toPromise();
    const app_module_file = tree.readContent("/projects/schematest/src/app/app.module.ts");

    expect(app_module_file).toContain("DappInjectorModule");
  });


  it("Add dependencies", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", configuration: "helloWorldContract" }, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8");
    expect(packageJson).toContain("\"hardhat\":");
  });

  it("Add scripts", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", configuration: "helloWorldContract" }, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8");

    expect(packageJson).toContain(`"compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile"`);
  });

  it("Hello app creates Hello world chain module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add", {}, appTree)
      .toPromise();
      expect(tree.exists("/projects/schematest/src/app/dapp-demos/1-hello-world-contract/hello-world-contract.module.ts")).toBeTrue();
  });


});
