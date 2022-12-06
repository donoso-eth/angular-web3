import { IOPTIONS_EXTENDED, UiFrameworkType } from "../schema";
import { configuration_options } from "../config/options.configuration";
import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { SchematicContext } from "@angular-devkit/schematics";

export const getOptionskeys= (_options:IOPTIONS_EXTENDED,context: SchematicContext) => {
    let toInstallKeys = []

     /// ============ add common initial ================= 
    if (_options.alreadyInstalled == false || _options.reset == true){
      toInstallKeys.push(configuration_options['initial'])
    }


    let demoConf = configuration_options.dappDemos[_options.dappDemo];
    if (_options.contractName != _options.dappDemo) {
      demoConf.templates_src[0].target = `/app/${dasherize(_options.contractName)}`
    }
    toInstallKeys.push(demoConf)
   

   /// ============ add ons configuration ================= 
    for (const addOn of _options.addOns) {
      toInstallKeys.push(configuration_options.addOns[addOn])
    }



       /// ============ add configuration ================= 
      if( _options.uiFramework !== 'noop') {
        toInstallKeys.push(configuration_options.uiFramework[_options.uiFramework as UiFrameworkType ])
      }
        
   
        
   /// ============ add common configuration for demo apps ================= 
    if (_options.demoToInstall== true ){
      toInstallKeys.push(configuration_options.dappDemoCommon)
    }




    return toInstallKeys;




}