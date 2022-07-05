const { merge } = require("webpack-merge")
const commonServerConfig = require("./webpack.common-server.js")

module.exports = merge(commonServerConfig, {
  mode: "production",
})
