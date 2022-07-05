const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.post("/", async (req, res) => {
  const data = req.body
  console.log(data)
  const response = await fetch("http://127.0.0.1:8000/api/sign-up", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
  res.send(await response.json())
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
