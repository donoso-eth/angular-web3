const watch = require("node-watch");
const { exec } = require("child_process");

const runDeployTinker = () => {
  console.log("🛠  Compiling & Deploying...");
  exec("npm run deploy", function (error, stdout, stderr) {
    console.log(stdout);
    if (error) console.log(error);
    if (stderr) console.log(stderr);
    exec("npm run tinker", function (error, stdout, stderr) {
      console.log(stdout);
      if (error) console.log(error);
      if (stderr) console.log(stderr);
      
    });
  });
};

const runTinker = () => {
  console.log("🛠  Running Tinker..");
    exec("npm run tinker", function (error, stdout, stderr) {
      console.log(stdout);
      if (error) console.log(error);
      if (stderr) console.log(stderr);
      
    });
  
};

console.log("🔬 Watching Contracts...");
watch("./contracts", { recursive: true }, function (evt, name) {
  console.log("%s changed.", name);
  runDeployTinker();
});

watch("./scripts", { recursive: true }, function (evt, name) {
  console.log("%s changed.", name);
  runTinker();
});

runDeployTinker();
