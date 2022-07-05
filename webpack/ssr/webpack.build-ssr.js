const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
//const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const clientConfigBuild = (entry, output) => {
  return {
    mode: "production",
    target: "web",
    entry: entry,
    output: output,
    plugins: [
      //HtmlWebpackPlugin will generate an HTML5 file that injects all webpack bundles in the body using script tags.
      new HtmlWebpackPlugin({
        filename: "index.[fullhash].html",
        template: path.resolve(__dirname, "../../template/index.html"),
        scriptLoading: "defer",
      }),
      //MiniCssExtractPlugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
      new MiniCssExtractPlugin({ filename: "styles.[fullhash].css" }),
      //CleanWebpackPlugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
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
          loader: "ts-loader", //Similar to "babel-loader" it transpiles TS files using the Babel compiler core. (The presets are configured in .babelrc)
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/, //This build-in loader replaces file-loader, raw-loader & and url-loader (new Webpack 5.0 feature to import images and such)
          type: "asset",
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // The order matters here: postcss-loader runs first (using the Tailwind jit-compiler to turn the Tailwind-classes into CSS); then css-loader transpiles the CSS into JS; then MiniCssExtractPlugin injects the JS (interpretable as CSS) into a seperate file... However, there one small problem: the css-file is not minified... That's were the CssMinimizerPlugin comes into play.
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], // now, after the CSS file got bundled, the usually minified index.js file (minified by webpack default via TerserPlugin) isn't minified anymore... That's were the TerserPlugin comes into play.
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".css"], //list of extension allowed for import without mentioning file extension
    },
  }
}

const serverConfigBuild = (entry, output) => {
  return {
    mode: "production",
    externals: [nodeExternals()],
    target: "node",
    entry: entry,
    output: output,
    plugins: [new CleanWebpackPlugin()],
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
  clientConfigBuild(
    require("../entry-paths").entrySsrClient,
    require("../output-paths").outputSsrBuildClient
  ),
  serverConfigBuild(
    require("../entry-paths").entrySsrServer,
    require("../output-paths").outputSsrBuildServer
  ),
]
