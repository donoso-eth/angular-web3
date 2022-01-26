import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { ngadd_scritps } from "./data/scripts";
import { IOPTIONS_EXTENDED } from "./schema";

const scripts:any = ngadd_scritps;

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

    Object.keys(scripts).forEach((key) => {
      if (!json.scripts[key]) {
        json.scripts[key] = scripts[key];
      }
    });

    //json.scripts = sortObjectByKeys(json.scripts);
    host.overwrite("package.json", JSON.stringify(json, null, 2));
  
  };
};
