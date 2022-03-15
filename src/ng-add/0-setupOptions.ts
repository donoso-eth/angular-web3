import { Tree, SchematicContext, SchematicsException } from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";
import { prompt } from 'inquirer'
import { configuration_options } from "./data/options.configuration";

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

    const project_keys = Object.keys(workspaceConfig.projects);
   
        if (project_keys.length == 1) {
            _options.projectFound = project_keys[0];
        } else {
            const questions = [{
                type: 'list',
                name: 'project',
                message: 'In which Project would you like to add angular-web3?',
                choices: project_keys
            }];
            const answer = await prompt(questions)
            _options.projectFound = answer['project']

        }
        // #endregion get project

        // ============ get the source folder Path  ========================
        // #region get source folder path

        project = workspaceConfig.projects[_options.projectFound as string];
        _options.sourceRoot = project.sourceRoot;
        // #endregion get source path

        // ============ get Demo app/services ========================
        // #region get source folder path
        if (_options.test == false) {
        const questions = [{
            type: 'confirm',
            name: 'demo',
            message: 'Do you want to Install a Demo App',
            default: false

        }];
        const answer = await prompt(questions)

        _options.demoToInstall = answer.demo;

        // ============ If Demo APP========================
        if (_options.demoToInstall == true) {
            const questionsDemo = [{
                type: 'list',
                name: 'demoApp',
                message: 'In which Project would you like to add angular-web3?',
                choices: ["Hello World Contract", "Debug Contract", "Nft Contract"],
                filter(value: string) {
                    let valueChanged = value.split(" ").join("");
                    let first_ele = valueChanged.substring(0, 1).toLowerCase()
                    let rest = valueChanged.substring(1, valueChanged.length)
                    return first_ele + rest
                }
            }];
            const answerDemo = await prompt(questionsDemo)
            console.log(answerDemo)
            _options.dappDemo = answerDemo.demoApp
            _options.dappServices = configuration_options.dappDemos[_options.dappDemo].dappServices
        } else {
            // ============ If Not demo APP========================
            _options.dappDemo = "minimalContract"
            const questionsNoDemo = [{
                type: 'checkbox',
                name: 'dappServices',
                message: 'In which Project would you like to add angular-web3?',
                choices: ["Subgraph", "Ipfs"],
                filter(value: string[]) {
                    return value.map(map => {
                        let first_ele = map.substring(0, 1).toLowerCase()
                        let rest = map.substring(1, map.length)
                        return first_ele + rest
                    })

                }
            }];
            const answerNoDemo = await prompt(questionsNoDemo)
            _options.dappServices = answerNoDemo.dappServices
        }

        // #endregion get Demo App/services

    }

    if (_options.skipInstall == undefined) {
        _options.skipInstall = false;
    }
    _options.alreadyInstalled = false;
    if (host.exists("hardhat/hardhat.config.ts") == true) {
        _options.alreadyInstalled = true;
    }


    
    // ============ if IPFS change custom webpack  ========================
    if (_options.dappServices.indexOf('ipfs')!== -1) {
        workspaceConfig.projects[_options.projectFound as string]["architect"]["build"]["builder"] = "@angular-builders/custom-webpack:browser";
        workspaceConfig.projects[_options.projectFound as string]["architect"]["build"]["options"]["customWebpackConfig"] = { "path": "./extra-webpack.config.js" }
        workspaceConfig.projects[_options.projectFound as string]["architect"]["serve"]["builder"] = "@angular-builders/custom-webpack:browser";
    }

    host.overwrite("angular.json", JSON.stringify(workspaceConfig));

    


    return host;
};
