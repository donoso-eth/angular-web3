import { Tree } from "@angular-devkit/schematics";

interface PackageJson {
  dependencies: Record<string, string>;
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

export function addPackageToPackageJson(
  host: Tree,
  deps:Record<string, string>
): Tree {
  if (host.exists("package.json") == false) {
    host.create("package.json", "{}");
  }
  const sourceText = host.read("package.json")!.toString("utf-8");
  const json = JSON.parse(sourceText) as PackageJson;

  if (!json.dependencies) {
    json.dependencies = {};
  }

  Object.keys(deps).forEach((key) => {
    if (!json.dependencies[key]) {
      json.dependencies[key] = deps[key];
    }
  });

  json.dependencies = sortObjectByKeys(json.dependencies);
  host.overwrite("package.json", JSON.stringify(json, null, 2));

  return host;
}

export function addPackageToDevPackageJson(
  host: Tree,
  deps: Record<string, string>
): Tree {
  if (host.exists("package.json") == false) {
    host.create("package.json", "{}");
  }
  const sourceText = host.read("package.json")!.toString("utf-8");
  const json = JSON.parse(sourceText) as PackageJson;

  if (!json.devDependencies) {
    json.devDependencies = {};
  }
  Object.keys(deps).forEach((key) => {
    if (!json.devDependencies[key]) {
      json.devDependencies[key] = deps[key];
    }
  });

  console.log(json);

  host.overwrite("package.json", JSON.stringify(json, null, 2));

  return host;
}
