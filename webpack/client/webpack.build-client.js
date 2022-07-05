const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin") // part of Webpack default (minimizes JS files). It's required because CssMinimizerPlugin overwrites the default webpack configuration; so it has to be put back in maually as an optimizer.
const common = require("./webpack.common-client")
const path = require("path")

const buildClientCommonConfig = (output) => {
  return merge(common, {
    mode: "production",
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
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!server", "!ssr"],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // The order matters here: postcss-loader runs first (using the Tailwind jit-compiler to turn the Tailwind-classes into CSS); then css-loader transpiles the CSS into JS; then MiniCssExtractPlugin injects the JS (interpretable as CSS) into a seperate file... However, there one small problem: the css-file is not minified... That's were the CssMinimizerPlugin comes into play.
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], // now, after the CSS file got bundled, the usually minified index.js file (minified by webpack default via TerserPlugin) isn't minified anymore... That's were the TerserPlugin comes into play.
    },
  })
}

module.exports = buildClientCommonConfig(
  require("../output-paths").outputClientBuild
)
