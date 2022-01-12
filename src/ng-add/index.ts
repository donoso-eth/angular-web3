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
import { IOPTIONS } from "./schema";
import { createFiles } from "./createFiles";

export interface IOPTIONS_EXTENDED extends IOPTIONS{
  sourceRoot?:string
}

//import {hardhat_config} from './data/hardhar.config'

// You don't have to export the function as default. You can also have more than one rule factory
// per file.




/** Adds a package to the package.json in the given host tree. */

export function setupOptions(host: Tree, options: IOPTIONS_EXTENDED): Tree {
  let workspaceConfig;

  workspaceConfig = JSON.parse(host.read("angular.json")!.toString("utf-8"));

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

  options.sourceRoot = project.sourceRoot;

  return host;
}

function installDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());
    _context.logger.debug("✅️ Dependencies installed");
    return tree;
  };
}

export function ngAdd(options: IOPTIONS_EXTENDED): Rule {
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

    installDependencies(),
  ]);
}
