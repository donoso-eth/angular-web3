import { IOPTIONS_EXTENDED, UiFrameworkType } from "../schema";
import { configuration_options } from "../config/options.configuration";

export const getOptionskeys= (_options:IOPTIONS_EXTENDED) => {
    let toInstallKeys = []
  
  
     /// ============ add common initial ================= 
    if (_options.alreadyInstalled == false || _options.reset == true){
      toInstallKeys.push(configuration_options['initial'])
    }
  
    toInstallKeys.push(configuration_options.dappDemos[_options.dappDemo])
  
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