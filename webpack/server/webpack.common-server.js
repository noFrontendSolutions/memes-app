const path = require("path")
const nodeExternals = require("webpack-node-externals")
//const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const commonServerConfig = (entry, output) => {
  return {
    target: "node",
    entry: entry,
    output: output,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader", //This package allows transpiling JavaScript (and JSX) files using Babel compiler core.
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader", //similar to "babel-loader" it transpiles TS files using the Babel compiler core.
          exclude: /node_modules/,
        },
      ],
    },
    externals: [nodeExternals()], // nodeExternals is required if you intend to bundle code that includes Express functions. (without it you'll end up with warnings and a file that runs, but is enourmas in size.)
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"], //list of extension allowed for import without mentioning file extension
      // plugins: [
      //   new TsconfigPathsPlugin({
      //     configFile: path.resolve(__dirname, "../../tsconfig.json"),
      //     baseUrl: "./",
      //   }),
      // ],
    },
  }
}

module.exports = commonServerConfig(
  require("../entry-paths").entryServer,
  require("../output-paths").outputServer
)
