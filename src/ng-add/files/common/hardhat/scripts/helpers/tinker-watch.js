const watch = require("node-watch");
const { exec } = require("child_process");

const runTinker = () => {
  console.log("🛠  Running Tinker..");
    exec("npm run tinker", function (error, stdout, stderr) {
      console.log(stdout);
      if (error) console.log(error);
      if (stderr) console.log(stderr);
    });
  
};



watch("../scripts/tinker/tinker.ts", { recursive: true }, function (evt, name) {
  console.log("%s changed.", name);
  runTinker();
});

runDeployTinker();
