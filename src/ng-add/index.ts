
import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { IOPTIONS_EXTENDED } from "./schema";
import { createFiles } from "./createFiles";
import { addAndinstallDependencies } from "./addAndInstallDependencies";
import { adScriptsToPackageJson } from "./addScriptsToPackageJson";
import { contract_config } from "./data/contract.config.";

/** Adds a package to the package.json in the given host tree. */
const setupOptions = (host: Tree, _options: IOPTIONS_EXTENDED): Tree => {
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

  if (_options.project == "default") {
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
    project = workspaceConfig.projects[_options.project];

    if (project == undefined) {
      throw new SchematicsException("Default project Not Available");
    }
  }

  _options.sourceRoot = project.sourceRoot;

  _options.alreadyInstalled = false;
  if (host.exists("hardhat/hardhat.config.ts")== true) {
    _options.alreadyInstalled = true;
    _options.skipInstall = true;
  } 


  return host;
}

const changeContractConfig = (host: Tree, _options: IOPTIONS_EXTENDED): Tree =>{
  
  const contractConfig:any =  contract_config;
  if (_options.alreadyInstalled == false) {
    const contractConfigString = JSON.stringify({[_options.configuration]:contractConfig[_options.configuration]})
    host.create("hardhat/contract.config.json", contractConfigString)

  } else {
  let alreadyConfig;
  alreadyConfig = JSON.parse(host.read("hardhat/contract.config.json")!.toString("utf-8"));

  let project;

  if (!alreadyConfig) {
    throw new SchematicsException("If project does exist, I should not be here");
  } 

  alreadyConfig[_options.configuration] =contractConfig[_options.configuration]
  const contractConfigString = JSON.stringify(alreadyConfig)
  
  host.overwrite("hardhat/contract.config.json", contractConfigString)
  } 
  return host;
}

export function ngAdd(_options: IOPTIONS_EXTENDED): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      setupOptions(tree, _options);
    },
    (tree: Tree, _context: SchematicContext) => {
      changeContractConfig(tree, _options);
    },
    (tree: Tree, _context: SchematicContext) => {
      return createFiles(tree, _options);
    },
    adScriptsToPackageJson(_options),
    addAndinstallDependencies(_options),
  ]);
}
