const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
//const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const NodemonPlugin = require("nodemon-webpack-plugin")
const WebpackCopyBundle = require("webpack-copy-bundle")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const clientConfigDev = (entry, output) => {
  return {
    mode: "development",
    target: "web",
    entry: entry,
    output: output,
    devtool: "inline-source-map",
    plugins: [
      //HtmlWebpackPlugin will generate an HTML5 file that injects all webpack bundles in the body using script tags.
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../../template/index.html"),
        scriptLoading: "defer",
      }),
      // The copy plugin below is absolutely crucial. It copies the index.js bundle into the server folder. Without it you wouldn't get any styles showing up in the browser.
      new WebpackCopyBundle({
        index: "../server",
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)/,
          loader: "babel-loader", //This package allows transpiling JavaScript (and JSX) files using Babel compiler core. (The presets are configured in .babelrc)
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader", //similar to "babel-loader" it transpiles TS files using the Babel compiler core. (The presets are configured in .babelrc)
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/, // // //This build-in loader replaces file-loader, raw-loader & and url-loader (new Webpack 5.0 feature to import images and such)
          type: "asset",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"], // Once again, the order matters here: postcss-loader runs first (using the Tailwind jit-compiler to turn the Tailwind-classes into CSS); then css-loader transpiles the CSS into JS; then MiniCssExtractPlugin injects the JS (interpretable as CSS) into a seperate file... However, there one small problem: the css-file is not minified... That's were the CssMinimizerPlugin comes into play.
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".css"], //list of extension allowed for import without mentioning file extension
    },
  }
}

const serverConfigDev = (entry, output) => {
  return {
    mode: "development",
    externals: [nodeExternals()],
    target: "node",
    entry: entry,
    output: output,
    devtool: "inline-source-map",
    plugins: [
      new NodemonPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!index.js"], // It's crucial not to erase "index.js" in the server-folder because it's been copied from "target: web" after compilation finished and is required by the dev-server.
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", "css"],
      // plugins: [
      //   new TsconfigPathsPlugin({
      //     configFile: path.resolve(__dirname, "../../src/ssr/tsconfig.json"),
      //     baseUrl: "./",
      //   }),
      // ],
    },
  }
}

module.exports = [
  clientConfigDev(
    require("../entry-paths").entrySsrClient,
    require("../output-paths").outputSsrDevClient
  ),
  serverConfigDev(
    require("../entry-paths").entrySsrServer,
    require("../output-paths").outputSsrDevServer
  ),
]
