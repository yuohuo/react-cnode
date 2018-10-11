const axios = require("axios");
const path = require("path");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDomServer = require("react-dom/server");

const serverConfig = require("../../build/webpack.config.server");

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8888/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};

//outputs all the errors and warnings that webpack may have
const outputErrors = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
};

/**
 * Compiling Webpack bundle from custom script and running our server.
 * As webpack can be run from inside a script using webpack node library,
 * so we can use webpack watch files and recompile whenever they change.
 */
console.log("Compiling bundle...");

const Module = module.constructor;
const mfs = new MemoryFs();
let serverBundle;

//create a webpack compiler and emit the output file into memory-fs
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

//runs the compiler to compile the webpack bundle asyncronously
serverCompiler.watch({}, (err, stats) => {
  // if (err) throw err;
  // stats = stats.toJson();
  // stats.errors.forEach(err => console.error(err));
  // stats.warnings.forEach(warn => console.warn(warn));

  outputErrors(err, stats);

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  //use memory-fs to store our created server bundle in the memory instead of filesystem
  //in order to increase performance
  const bundle = mfs.readFileSync(bundlePath, "utf-8");

  /**
   * hack string to module, and indicate filename used in memory.
   * This module can also be created by using require-from-string library
   */
  const m = new Module();
  m._compile(bundle, serverConfig.output.filename);
  serverBundle = m.exports.default;
});

module.exports = function(app) {
  //proxy static files to webpack-dev-server URL
  app.use(
    "/public",
    proxy({
      target: "http://localhost:8888"
    })
  );
  app.get("*", function(req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle);
      res.send(template.replace("<!-- app -->", content));
    });
  });
};
