
import { normalize } from "@angular-devkit/core";
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
        { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" },
        appTree
      )
      .toPromise();

    expect(tree.files.length).toBeGreaterThan(2);
  });


  it("No demo app installation should work", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", test:true,demoToInstall:false, addOns:[],dappDemo: "noop" },
        appTree
      )
      .toPromise();

    expect(tree.files.length).toBeGreaterThan(2);
  });


  it("No demo app should not install miminalcontract", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", test:true,demoToInstall:false, addOns:[],dappDemo: "noop" },
        appTree
      )
      .toPromise();

      expect(tree.exists(normalize("/projects/schematest/src/app/0-minimal-contract/minimal-contract.module.ts"))).toBeFalse();

  });



  it("Creates Hardhat Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
      .toPromise();

    expect(tree.exists("hardhat/hardhat.config.ts")).toBeTrue();
  });


  it("Creates Contract JSON Config File", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
      .toPromise();

    expect(tree.exists("hardhat/contract.config.json")).toBeTrue();
  });



  it("Should add Injector module ", async () => {

    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
      .toPromise();
    const app_module_file = tree.readContent("/projects/schematest/src/app/app.module.ts");

    expect(app_module_file).toContain("DappInjectorModule");
  });


  it("Add dependencies", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8");
    expect(packageJson).toContain("\"hardhat\":");
  });

  it("Add scripts", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
      .toPromise();
    const packageJson = tree.read("package.json")!.toString("utf-8");

    expect(packageJson).toContain(`"compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile"`);
  });

  
  // it("It adds fonts to index.html", async () => {
  //   const tree = await schematicRunner
  //     .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
  //     .toPromise();
  //     const indexHtml = tree.read(normalize("/projects/schematest/src/index.html"))!.toString("utf-8");
  //     expect(indexHtml).toContain(`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`);
  // });


  it("No Demo app should install Mnimal Module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:false, addOns:[],dappDemo: "minimalContract" }, appTree)
      .toPromise();
 
      expect(tree.exists(normalize("/projects/schematest/src/app/0-minimal-contract/minimal-contract.module.ts"))).toBeTrue();
  });

  it("Hello app creates Hello world chain module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "helloWorldContract" }, appTree)
      .toPromise();

      expect(tree.exists(normalize("/projects/schematest/src/app/1-hello-world-contract/hello-world-contract.module.ts"))).toBeTrue();
  });

  it("Debug app creates Debug world  module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "debugContract" }, appTree)
      .toPromise();

      expect(tree.exists(normalize("/projects/schematest/src/app/2-debug-contract/debug-contract.module.ts"))).toBeTrue();
  });

  it("NFT Demo app creates NFT world  module", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "nftContract" }, appTree)
      .toPromise();

      expect(tree.exists(normalize("/projects/schematest/src/app/3-nft-contract/nft-contract.module.ts"))).toBeTrue();
  });

  it("NFT Demo creates custom webpack", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("ng-add",  { project: "default", test:true,demoToInstall:true, addOns:[],dappDemo: "nftContract" }, appTree)
      .toPromise();
      expect(tree.exists(normalize("extra-webpack.config.js"))).toBeTrue();
  });

});
