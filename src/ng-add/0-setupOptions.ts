import {
  Tree,
  SchematicContext,
  SchematicsException,
} from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";
import { prompt } from "inquirer";
import { configuration_options } from "./config/options.configuration";
import { JSONFile } from "./helpers/json-file";
import { camelize, capitalize } from "@angular-devkit/core/src/utils/strings";

///////////////////////////////////////////////////////////
//////////////////// SetUp Options /////////////////////////
///////////////////////////////////////////////////////////

export const setupOptions = async (
  host: Tree,
  _options: IOPTIONS_EXTENDED,
  context: SchematicContext
): Promise<Tree> => {
  // ============ Get Project, if more than one in workspace inquire with prompt  ========================
  // #region get project
  let workspaceConfig;
  workspaceConfig = new JSONFile(host, "angular.json");
  let project;

  if (!workspaceConfig) {
    throw new SchematicsException("Not an Angular CLI workspace");
  }

  const projects = workspaceConfig.get(["projects"]) as { [key: string]: any };
  if (
    projects == undefined ||
    Object.keys(workspaceConfig.get(["projects"]) as Array<string>).length == 0
  ) {
    throw new SchematicsException("Not Angualar Projects Available");
  }

  const project_keys = Object.keys(projects);

  if (project_keys.length == 1) {
    _options.projectFound = project_keys[0];
  } else {
    const questions = [
      {
        type: "list",
        name: "project",
        message: "In which Project would you like to add angular-web3?",
        choices: project_keys,
      },
    ];
    const answer = await prompt(questions);
    _options.projectFound = answer["project"];
  }
  // #endregion get project

  // ============ get the source folder Path  ========================
  // #region get source folder path

  project = projects[_options.projectFound as string];
  _options.sourceRoot = project.sourceRoot;
  // #endregion get source path

  _options.alreadyInstalled = false;
  if (host.exists("hardhat/hardhat.config.ts") == true) {
    _options.alreadyInstalled = true;
    _options.demoToInstall = false;
  }

  // ============ get Demo app/services ========================
  // #region get source folder path
  if (_options.test == false && _options.alreadyInstalled == false) {
    const questions = [
      {
        type: "confirm",
        name: "demo",
        message: "Do you want to Install a Demo App",
        default: false,
      },
    ];
    const answer = await prompt(questions);

    _options.demoToInstall = answer.demo;
  }

  // ============ If Demo APP========================
  if (_options.demoToInstall == true) {
    if (_options.test == false) {
      const questionsDemo = [
        {
          type: "list",
          name: "demoApp",
          message: "Which demoApp do you want to install",
          choices: [
            "Hello World Contract",
            "Debug Contract",
            "Nft Contract",
            "Super Fluid",
            "Lens Protocol",
            "The Graph",
          ],
          filter(value: string) {
            let valueChanged = value.split(" ").join("");
            let first_ele = valueChanged.substring(0, 1).toLowerCase();
            let rest = valueChanged.substring(1, valueChanged.length);
            return first_ele + rest;
          },
        },
      ];
      const answerDemo = await prompt(questionsDemo);

      _options.dappDemo = answerDemo.demoApp;
      _options.contractName = _options.dappDemo;
    }
    _options.addOns = configuration_options.dappDemos[_options.dappDemo].addOns;
  } else {
    // ============ If Not demo APP========================
    if (_options.test == false) {
        const questionNameContract = [
            {
              name: "contractName",
              type: "input",
              default: "defaultContract",
              message: "Enter Contract Name",
              validate(value: string) {
                if (value.length) {

                  return true;
                }
                return "It cannot be empty. Please enter it correctly...";
              },
              filter(value:string) {
                return capitalize(camelize((value)))
              }
            },
          ];
    
          _options.dappDemo = "minimalContract";
          const answerName= await prompt(questionNameContract);
          _options.contractName = answerName.contractName;
         //// Ui's framework to install
         const questionsUiFramework = [
            {
              type: "list",
              name: "uiFramework",
              message: "Do you want to install a Ui Framework",
              default:"noop",
              choices: [
                "noop",
                "PrimeNG",
            
              ],
              filter(value: string) {
                let valueChanged = value.split(" ").join("");
                let first_ele = valueChanged.substring(0, 1).toLowerCase();
                let rest = valueChanged.substring(1, valueChanged.length);
                return first_ele + rest;
              },
            },
          ];
          const answerUI = await prompt(questionsUiFramework);

          _options.uiFramework = answerUI.uiFramework;

      //// Services to install
      const questionsServices = [
        {
          type: "checkbox",
          name: "dappServices",
          message: "Which services would you like to add to your project?",
          choices: [
            "Ipfs Service",
            "Super FluidService",
            "Lit Protocol Service",
            "GraphQl Service",
            "Subgraph",
            "Graph Node",
          ],
          filter(value: string[]) {
            return value.map((map) => {
              map = map.split(" ").join("");
              let first_ele = map.substring(0, 1).toLowerCase();
              let rest = map.substring(1, map.length);
              return first_ele + rest;
            });
          },
        },
      ];
      const answerNoDemo = await prompt(questionsServices);
      _options.addOns = answerNoDemo.dappServices;

  
    }
  }

  // #endregion get Demo App/services

  if (_options.skipInstall == undefined) {
    _options.skipInstall = false;
  }

  // ============ Manual Angular Material installation  ========================
  if (_options.demoToInstall == true) {
    const styles_path = [
      "projects",
      _options.projectFound as string,
      "architect",
      "build",
      "options",
      "styles",
    ];
    const styles = workspaceConfig.get(styles_path) as Array<string>;
    workspaceConfig.modify(
      styles_path,
      [
        "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
      ].concat(styles)
    );
  }

  // ============ if IPFS change custom webpack  ========================
  // if (_options.addOns.indexOf("ipfsService") !== -1) {
  //     workspaceConfig.modify(
  //         [
  //             "projects",
  //             _options.projectFound as string,
  //             "architect",
  //             "build",
  //             "builder",
  //         ],
  //         "@angular-builders/custom-webpack:browser"
  //     );
  //     workspaceConfig.modify(
  //         [
  //             "projects",
  //             _options.projectFound as string,
  //             "architect",
  //             "build",
  //             "options",
  //             "customWebpackConfig",
  //             "path",
  //         ],
  //         "./extra-webpack.config.js"
  //     );
  //     workspaceConfig.modify(
  //         [
  //             "projects",
  //             _options.projectFound as string,
  //             "architect",
  //             "serve",
  //             "builder",
  //         ],
  //         "@angular-builders/custom-webpack:dev-server"
  //     );
  // }

  // host.overwrite("angular.json", JSON.stringify(workspaceConfig));

  return host;
};
