const path = require("path")

//**********ROOT OUTPUT PATHS OF BACKEND AND FRONTEND***********
const outputRootClient = "dist/client"
const outputRootServer = "dist/server"

const outputRootSsrClient = "dist/ssr/client"
const outputRootSsrServer = "dist/ssr/server"

//**************************************************************
//*****************WEBPACK CLIENT PATHS*************************
//**************************************************************

//***************DEVELOPMENT*****************************

const outputClientDev = {
  filename: "[name].js", //[name] comes from entry points
  path: path.resolve(__dirname, `../${outputRootClient}`),
}

//******************BUILD CLIENT********************************

const outputClientBuild = {
  filename: "[name].[fullhash].js",
  path: path.resolve(__dirname, `../${outputRootClient}`),
  assetModuleFilename: "images/[name].[hash][ext]",
}

//**************************************************************
//*****************WEBPACK SERVER PATHS*************************
//**************************************************************

//****************DEV & BUILD****************************

const outputServer = {
  filename: "[name].js",
  path: path.resolve(__dirname, `../${outputRootServer}`),
}

//**************************************************************
//*****************WEBPACK SSR PATHS****************************
//**************************************************************

//****************SSR DEV***************************************

const outputSsrDevClient = {
  filename: "[name].js",
  path: path.resolve(__dirname, `../${outputRootSsrClient}`),
  assetModuleFilename: "images/[name].[ext]",
}

const outputSsrDevServer = {
  filename: "[name].js",
  path: path.resolve(__dirname, `../${outputRootSsrServer}`),
  assetModuleFilename: "images/[name].[ext]",
}

//****************SSR BUILD**************************************

const outputSsrBuildClient = {
  filename: "[name].[fullhash].js",
  path: path.resolve(__dirname, `../${outputRootSsrClient}`),
  assetModuleFilename: "images/[name].[hash][ext]",
}

const outputSsrBuildServer = {
  filename: "[name].js",
  path: path.resolve(__dirname, `../${outputRootSsrServer}`),
  assetModuleFilename: "images/[name].[hash][ext]",
}

module.exports = {
  outputClientDev,
  outputClientBuild,
  outputServer,
  outputSsrDevClient,
  outputSsrDevServer,
  outputSsrBuildClient,
  outputSsrBuildServer,
  outputRootClient,
  outputRootSsrClient,
  outputRootSsrServer,
  outputRootServer,
}
