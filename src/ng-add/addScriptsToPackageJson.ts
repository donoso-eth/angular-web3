import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";


import { getOptionskeys } from "./helpers/getOptionsKeys";
import { IOPTIONS_EXTENDED } from "./schema";


interface PackageJson {
  scripts: Record<string, string>;
  devDependencies: Record<string, string>;
}

function sortObjectByKeys(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {} as Record<string, string>);
}

export const adScriptsToPackageJson = (_options: IOPTIONS_EXTENDED): Rule => {
  return (host: Tree, _context: SchematicContext) => {

   

    if (host.exists("package.json") == false) {
      host.create("package.json", "{}");
    }
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText) as PackageJson;

    if (!json.scripts) {
      json.scripts = {};
    }

    let toInstallKeys = getOptionskeys(_options)

    for (const installKey of toInstallKeys) {

      if (installKey.scripts !== undefined) {
      Object.keys(installKey.scripts).forEach((key) => {
        if (!json.scripts[key]) {
          json.scripts[key] = installKey.scripts[key];
        }
      });
    }
    }


    


    //json.scripts = sortObjectByKeys(json.scripts);
    host.overwrite("package.json", JSON.stringify(json, null, 2));
  
  };
};
