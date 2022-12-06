import { Tree } from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";
import { IOPTIONS_EXTENDED } from "./schema";
import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { JSONFile } from "./helpers/json-file";

export const updateStyles = (tree: Tree, _options: IOPTIONS_EXTENDED): Tree => {
  if (_options.uiFramework == 'primeNG') {
    const pathString = normalize(
      `/${_options.sourceRoot}/styles.scss`
    );


    tree.overwrite(
      pathString,
      `
@import "../node_modules/primeng/resources/primeng.min.css";
@import "../node_modules/primeflex/primeflex.scss";
@import "../node_modules/primeicons/primeicons.css";
@import "../node_modules/prismjs/themes/prism-coy.css";

@import "assets/sass/layout/_variables";
@import "assets/sass/layout/_layout";
@import "assets/sass/overrides/_overrides";`
    );
  }

  return tree;
};
