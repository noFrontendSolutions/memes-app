//const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path")

const clientBuildConfig = (entry) => {
  return {
    entry: entry,
    module: {
      rules: [
        {
          test: /\.(js|jsx)/,
          loader: "babel-loader", //This package allows transpiling JavaScript (and JSX) files using Babel compiler core. (The presets are configured in .babelrc)
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader", //Similar to "babel-loader" it transpiles TS files using the Babel compiler core. (The presets are configured in .babelrc)
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/, //This build-in loader replaces file-loader, raw-loader & and url-loader (new Webpack 5.0 feature to import images and such)
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".css"], //list of extension allowed for import without mentioning file extension
      // plugins: [
      //   new TsconfigPathsPlugin({
      //     configFile: path.resolve(__dirname, "../../src/client/tsconfig.json"),
      //     extensions: [".js", ".jsx", ".tsx", ".ts"],
      //   }),
      // ],
    },
  }
}

module.exports = clientBuildConfig(require("../entry-paths").entryClient)
