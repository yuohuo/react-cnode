const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: {
    app: path.join(__dirname, "../client/index.js")
  },
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: "babel-loader",
        exclude: [path.join(__dirname, "../node_modules")]
      },
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: [path.join(__dirname, "../node_modules")]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "../client/template.html")
    })
  ]
};

if (isDev) {
  config.entry = {
    app: ["react-hot-loader/patch", path.join(__dirname, "../client/index.js")]
  };
  config.devServer = {
    host: "0.0.0.0", //allow 3 ways to access
    port: "8888",
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    overlay: {
      error: true
    },
    publicPath: "/public",
    //
    historyApiFallback: {
      index: "/public/index.html"
    }
  };

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;