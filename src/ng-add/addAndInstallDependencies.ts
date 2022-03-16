import { Rule, Tree, SchematicContext } from "@angular-devkit/schematics";
import { NodePackageInstallTask, } from "@angular-devkit/schematics/tasks";
import { devDeps, devs } from "./data/dep";
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
    deps: Record<string, string>
  ): Tree => {
    if (host.exists("package.json") == false) {
      host.create("package.json", "{}");
    }
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText) as PackageJson;
  
    if (!json.dependencies) {
      json.dependencies = {};
    }


    Object.keys(deps).forEach((key) => {
      if (!json.dependencies[key]) {
        json.dependencies[key] = deps[key];
      }
    });
  
    json.dependencies = sortObjectByKeys(json.dependencies);
    host.overwrite("package.json", JSON.stringify(json, null, 2));
  
    return host;
  }
  
 const addPackageToDevPackageJson = (
    host: Tree,
    deps: Record<string, string>
  ): Tree => {
    if (host.exists("package.json") == false) {
      host.create("package.json", "{}");
    }
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText) as PackageJson;
  
    if (!json.devDependencies) {
      json.devDependencies = {};
    }
      
  
    Object.keys(deps).forEach((key) => {
      if (!json.devDependencies[key]) {
        json.devDependencies[key] = deps[key];
      }
    });
  
    host.overwrite("package.json", JSON.stringify(json, null, 2));
  
    return host;
  }


export const addAndinstallDependencies = (_options:IOPTIONS_EXTENDED): Rule => {
    return (tree: Tree, _context: SchematicContext) => {
    
      let dependencies_to_install = {};
      let dev_dependencies_to_install = {};

      if (_options.alreadyInstalled == false) {
        dependencies_to_install = {...dependencies_to_install,...devs.initial};
        dev_dependencies_to_install = {...dev_dependencies_to_install,...devDeps.initial}
      }

      if (_options.demoToInstall == true){
        dependencies_to_install = {...dependencies_to_install,...devs.dappDemo,...devs[_options.dappDemo]};
     
      }

      _options.dappServices.forEach(service=> {
        dependencies_to_install = {...dependencies_to_install,...devs[service]};
        dev_dependencies_to_install = {...dev_dependencies_to_install,...devDeps[service]};
      })

      addPackageToDevPackageJson(tree, dev_dependencies_to_install);
      addPackageToPackageJson(tree, dependencies_to_install)



        if (_options.skipInstall == false) {
            _context.addTask(new NodePackageInstallTask());
            _context.logger.debug("✅️ Dependencies installed");
            
        }
      return tree;
    };
  }
  