import { TaskConfiguration, TaskConfigurationGenerator } from "@angular-devkit/schematics";


export class NodePackageLinkTask implements TaskConfigurationGenerator<any> {
    quiet = true;
  
    constructor(public packageName?: string, public workingDirectory?: string) {}
  
    toConfiguration(): TaskConfiguration<any> {
      return {
        name: 'node-package',
        options: {
          command: 'test',
          args:['wire'],
          quiet: this.quiet,
        },
      };
    }
  }