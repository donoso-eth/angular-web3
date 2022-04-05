import { Rule, Tree, SchematicContext } from "@angular-devkit/schematics";
import { NodePackageInstallTask, } from "@angular-devkit/schematics/tasks";

import { getOptionskeys } from "./helpers/getOptionsKeys";
import { DappDemoType, IOPTIONS_EXTENDED } from "./schema";

interface PackageJson {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  }
  
  function sortObjectByKeys(obj: Record<string, string>) {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {} as Record<string, string>);
  }

 const addPackageToPackageJson = (
    host: Tree,
    _options:IOPTIONS_EXTENDED
  ): Tree => {
    if (host.exists("package.json") == false) {
      host.create("package.json", "{}");
    }
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText) as PackageJson;
  
    if (!json.dependencies) {
      json.dependencies = {};
    }


    let toInstallKeys = getOptionskeys(_options)

    for (const installKey of toInstallKeys) {

      if (installKey.deps !== undefined) {
      Object.keys(installKey.deps).forEach((key) => {
        if (!json.dependencies[key]) {
          json.dependencies[key] = installKey.deps[key];
        }
      });
    }
    }

  
    json.dependencies = sortObjectByKeys(json.dependencies);
    host.overwrite("package.json", JSON.stringify(json, null, 2));
  
    return host;
  }
  
 const addPackageToDevPackageJson = (
    host: Tree,
    _options:IOPTIONS_EXTENDED
  ): Tree => {
    if (host.exists("package.json") == false) {
      host.create("package.json", "{}");
    }
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText) as PackageJson;
  
    if (!json.devDependencies) {
      json.devDependencies = {};
    }
     

  
    let toInstallKeys = getOptionskeys(_options)



    for (const installKey of toInstallKeys) {

      if (installKey.devDeps !== undefined) {
      Object.keys(installKey.devDeps).forEach((key) => {
        if (!json.devDependencies[key]) {
          json.devDependencies[key] = installKey.devDeps[key];
        }
      });
    }
    }

  
    host.overwrite("package.json", JSON.stringify(json, null, 2));
  
    return host;
  }


export const addAndinstallDependencies = (_options:IOPTIONS_EXTENDED): Rule => {
    return (tree: Tree, _context: SchematicContext) => {
    

      addPackageToDevPackageJson(tree, _options);
      addPackageToPackageJson(tree, _options)


        if (_options.skipInstall == false) {
            _context.addTask(new NodePackageInstallTask());
            _context.logger.debug("✅️ Dependencies installed");
            
        }
      return tree;
    };
  }
  