import express from "express"
import fs from "fs"
import path from "path"
import { outputRootClient } from "../../webpack/output-paths"
import cors from "cors"
const port = process.env.PORT || 8081

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, `../../${outputRootClient}`)))

//The route below simulates a fetch call to an API from the frontend.
app.get("/heavy-load", async (req, res) => {
  await sleep(1000)
  const randomNumber = createRandomIntegerNotZero(20)
  res.json({ randomNumber: randomNumber })
})

app.get("/", (req, res) => {
  const indexHtml = getIndexHtmlFile()
  res.send(indexHtml)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})

//
//
//
// Since the index-html file is hashed (inside dist/client), I have to find it first before I'm able to serve...
function getIndexHtmlFile() {
  const htmlFileNames: string[] = fs
    .readdirSync(path.resolve(__dirname, `../../${outputRootClient}`))
    .filter((file) => file.endsWith(".html"))
  const indexHtmlName: string = htmlFileNames.filter((file) =>
    file.startsWith("index.")
  )[0]
  const indexHtml = fs.readFileSync(
    path.resolve(__dirname, `../../${outputRootClient}/${indexHtmlName}`),
    "utf8"
  )
  return indexHtml
}

function createRandomIntegerNotZero(max: number) {
  let randomNumber = 0
  while (randomNumber == 0) {
    let tempNumber = Math.random()
    if (tempNumber < 0.5) {
      randomNumber = -Math.floor(tempNumber * max)
    } else {
      randomNumber = Math.floor(tempNumber * max)
    }
  }
  return randomNumber
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
