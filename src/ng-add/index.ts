import { normalize } from "@angular-devkit/core";
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
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


function createFiles(): Rule {
  const templateSource = apply(url("./files"), [
    //  filter(path => path.endsWith('__name@dasherize__.module.ts.template')),
    applyTemplates({}),

    move(normalize(`/`)),
  ]);

  return mergeWith(templateSource);
}


/** Adds a package to the package.json in the given host tree. */




export function setupOptions(host: Tree, options:any): Tree {

  const workspaceConfig = JSON.parse(host.read('angular.json')!.toString("utf-8"));;
  let project;

  console.log(options)
  console.log(workspaceConfig)
  if (!workspaceConfig) {
    throw new SchematicsException("Not an Angular CLI workspace"); 
  } else if (workspaceConfig.projects == undefined || Object.keys(workspaceConfig.projects).length == 0){
    throw new SchematicsException("Not Angualar Projects Available"); 
  }


if (options.project == 'default') {

  const project_keys =  Object.keys(workspaceConfig.projects)
  
  if (workspaceConfig.default == undefined){
    project = workspaceConfig.projects(project_keys[0])
  } else {
      project = workspaceConfig.projects(workspaceConfig.default)

    if (project == undefined) {
      throw new SchematicsException("Default project Not Available"); 
    }

  }
} else {
  project = workspaceConfig.projects(options.project)

  if (project == undefined) {
    throw new SchematicsException("Default project Not Available"); 
  }
}

  return host;
}

// function installDependencies(): Rule {
//   return (tree: Tree, _context: SchematicContext) => {
//     console.log('hola')
//     _context.addTask(new NodePackageInstallTask());
//     _context.logger.debug('✅️ Dependencies installed');
//     return tree;
//   };
// }

export function ngAdd(_options: any): Rule {

  console.log(_options)

  return chain([
    createFiles(),
    (tree: Tree, _context: SchematicContext) => {
     // setupOptions(tree,_options)
      adScriptsToPackageJson(tree, ngadd_scritps)
      addPackageToDevPackageJson(tree, devDeps);
      _context.addTask(new NodePackageInstallTask());
      _context.logger.debug('✅️ Dependencies installed');
      return tree;
    },
  ]);
}
