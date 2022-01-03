import { normalize, strings } from "@angular-devkit/core";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import {
  apply,
  applyTemplates,
  branchAndMerge,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  template,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { devDeps } from "./data/dep";
import { ngadd_scritps } from "./data/scripts";
import { addPackageToDevPackageJson } from "./helpers/add_dependencies";
import { adScriptsToPackageJson } from "./helpers/add_scripts";


//import {hardhat_config} from './data/hardhar.config'

// You don't have to export the function as default. You can also have more than one rule factory
// per file.

let sourceRoot: string;
let sourceApp;

function createFiles(host: Tree, options: any): Rule {
  console.log('my sourceroot')
  const templateRules = [];
  const templateSource = apply(url("./files/common"), [
    applyTemplates({sourceRoot}),
    move(normalize(`/`)),
  ]);

  templateRules.push(mergeWith(templateSource,MergeStrategy.AllowCreationConflict));

  if (!host.exists("src/typings.d.ts")) {
    const templateTypings = apply(url("./files/typings"), [
      applyTemplates({}),
      move(normalize(`/src/`)),
    ]);
    templateRules.push(mergeWith(templateTypings));
  }

  if (options.configuration == "hello") {
    const templateBasics = apply(url("./files/basics/hello"), [
      applyTemplates({}),
      move(normalize(`/${sourceRoot}/app`)),
    ]);
    templateRules.push(mergeWith(templateBasics));
  }

  return chain(templateRules);
}
/** Adds a package to the package.json in the given host tree. */

export function setupOptions(host: Tree, options: any): Tree {
  const workspaceConfig = JSON.parse(
    host.read("angular.json")!.toString("utf-8")
  );
  let project;

  if (!workspaceConfig) {
    throw new SchematicsException("Not an Angular CLI workspace");
  } else if (
    workspaceConfig.projects == undefined ||
    Object.keys(workspaceConfig.projects).length == 0
  ) {
    throw new SchematicsException("Not Angualar Projects Available");
  }

  if (options.project == "default") {
    const project_keys = Object.keys(workspaceConfig.projects);

    if (workspaceConfig.default == undefined) {
      project = workspaceConfig.projects[project_keys[0]];
    } else {
      project = workspaceConfig.projects[workspaceConfig.default];

      if (project == undefined) {
        throw new SchematicsException("Default project Not Available");
      }
    }
  } else {
    project = workspaceConfig.projects[options.project];

    if (project == undefined) {
      throw new SchematicsException("Default project Not Available");
    }
  }

  sourceRoot = project.sourceRoot;

  return host;
}

function installDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    _context.addTask(new NodePackageInstallTask());
    _context.logger.debug('✅️ Dependencies installed');
    return tree;
  };
}

export function ngAdd(options: any): Rule {
  console.log(options);

  return chain([
    (tree: Tree, _context: SchematicContext) => {
      setupOptions(tree, options);
    },
    (tree: Tree, _context: SchematicContext) => {
     return createFiles(tree, options); 
    

    },

    (tree: Tree, _context: SchematicContext) => {

 

      adScriptsToPackageJson(tree, ngadd_scritps);
      addPackageToDevPackageJson(tree, devDeps);
      return tree;
    },

    installDependencies()
  ]);
}
