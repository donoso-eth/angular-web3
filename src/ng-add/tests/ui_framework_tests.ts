
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





  it("No demo app installation should work", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", contractName:'CustomName', uiFramework:"primeNG", test:true,demoToInstall:false, addOns:[],dappDemo: "minimalContract" },
        appTree
      )
      .toPromise();
     
        
        const app_module_file = tree.readContent("/projects/schematest/src/app/app.module.ts");
  

    expect(tree.files.length).toBeGreaterThan(2);
  });


  it("No demo app should add custom Contract name", async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        "ng-add",
        { project: "default", contractName:'CustomName', uiFramework:"primeNG",test:true,demoToInstall:false, addOns:[],dappDemo: "minimalContract" },
        appTree
      )
      .toPromise();
      expect(tree.exists(normalize('/projects/schematest/src/app/custom-name/custom-name.module.ts'))).toBeTrue();

  });



});
