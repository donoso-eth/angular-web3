import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("ng-add", () => {
  it("works", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync("ng-add", {project:"default", minimal:true,debug_vs_code:false}, Tree.empty())
      .toPromise();

    expect(tree.files.length).toBeGreaterThan(2);
  });
  // it("Creates Hardhat Config File", async () => {
  //   const runner = new SchematicTestRunner("schematics", collectionPath);
  //   const tree = await runner
  //     .runSchematicAsync("ng-add", {}, Tree.empty())
  //     .toPromise();

  //   const hardhat_config_file = tree.readContent("/hardhat.config.js");

  //   expect(hardhat_config_file == "").toBeFalse();
  // });

  // it("Add dependencies", async () => {
  //   const runner = new SchematicTestRunner("schematics", collectionPath);
  //   const tree = await runner
  //     .runSchematicAsync("ng-add", {}, Tree.empty())
  //     .toPromise();
  //   const packageJson = tree.read('package.json')!.toString('utf-8');

  //   expect(packageJson).toContain("hardhat");
  // });
});
