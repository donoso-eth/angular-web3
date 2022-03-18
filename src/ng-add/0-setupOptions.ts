import { Tree, SchematicContext, SchematicsException } from "@angular-devkit/schematics";
import { IOPTIONS_EXTENDED } from "./schema";
import { prompt } from 'inquirer'
import { configuration_options } from "./data/options.configuration";
import { JSONFile } from "./helpers/json-file";

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
    workspaceConfig = new JSONFile(host,"angular.json")
    let project;

    if (!workspaceConfig) {
        throw new SchematicsException("Not an Angular CLI workspace");
    } 
        
    const projects =  workspaceConfig.get(["projects"]) as {[key:string]:any}
    if (projects == undefined || Object.keys( workspaceConfig.get(["projects"]) as Array<string>).length == 0) {
  
        throw new SchematicsException("Not Angualar Projects Available");
     }

    const project_keys = Object.keys(projects);
   
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

        project = projects[_options.projectFound as string];
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
      
            _options.dappDemo = answerDemo.demoApp
            _options.dappServices = configuration_options.dappDemos[_options.dappDemo].dappServices
        } else {
            // ============ If Not demo APP========================
            _options.dappDemo = "minimalContract"
            const questionsNoDemo = [{
                type: 'checkbox',
                name: 'dappServices',
                message: 'Which services would you like to add to your project?',
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


      // ============ Manual Angular Material installation  ========================
    if (_options.demoToInstall == true){
        const styles_path = ['projects',_options.projectFound as string,"architect","build","options","styles"]
        const styles = workspaceConfig.get(styles_path) as Array<string>
        workspaceConfig.modify(styles_path,["./node_modules/@angular/material/prebuilt-themes/indigo-pink.css"].concat(styles))
    }
     

    
    // ============ if IPFS change custom webpack  ========================
    if (_options.dappServices.indexOf('ipfs')!== -1) {
        workspaceConfig.modify(['projects',_options.projectFound as string,"architect","build","builder"],"@angular-builders/custom-webpack:browser");
        workspaceConfig.modify(['projects',_options.projectFound as string,"architect","build","options","customWebpackConfig","path"],"./extra-webpack.config.js" )
        workspaceConfig.modify(['projects',_options.projectFound as string,"architect","serve","builder"],"@angular-builders/custom-webpack:dev-server")
    }

   // host.overwrite("angular.json", JSON.stringify(workspaceConfig));

    
    return host;
};
