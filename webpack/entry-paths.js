const path = require("path")

//**********ROOT ENTRY PATHS OF BACKEND AND FRONTEND AND SSR APP***********
const entryRootClient = "src/client"
const entryRootServer = "src/server"

const entryRootSsrClient = "src/ssr/client"
const entryRootSsrServer = "src/ssr/server"

//*************************************************************
//***********************WEBPACK ENTRY PATHS*******************
//*************************************************************

//***************ENTRY CLIENT**********************************
const entryClient = {
  index: path.resolve(__dirname, `../${entryRootClient}/index.tsx`),
}

//************ENTRY SERVER**************************************
const entryServer = {
  server: path.resolve(__dirname, `../${entryRootServer}/server.ts`),
}

//************ENTRY SSR**********************************************

const entrySsrClient = {
  index: path.resolve(__dirname, `../${entryRootSsrClient}/index.tsx`),
}

const entrySsrServer = {
  server: path.resolve(__dirname, `../${entryRootSsrServer}/server.tsx`),
}

module.exports = {
  entryClient,
  entryServer,
  entrySsrClient,
  entrySsrServer,
}
