const NodemonPlugin = require("nodemon-webpack-plugin")
const { merge } = require("webpack-merge")
const commonServerConfig = require("./webpack.common-server.js")

module.exports = merge(commonServerConfig, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [new NodemonPlugin()],
})
