import React, { useState } from "react"

const PostMeme = () => {
  const [memeTitle, setMemeTitle] = useState("")
  const [memeFile, setMemeFile] = useState(null)

  const onSubmit = async () => {
    let formData = new FormData()
    formData.append("title", memeTitle)
    formData.append("meme", memeFile)
    const response = await fetch("http://127.0.0.1:8000/api/post-meme", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "*",
        Accept: "*",
      },
      method: "POST",
      body: formData,
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <form>
        <input
          type="text"
          className="bg-slate-200"
          placeholder="Meme Tittle..."
          onChange={(e) => setMemeTitle(e.target.value)}
        />
        <input type="file" onChange={(e) => setMemeFile(e.target.files[0])} />
      </form>
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  )
}

export default PostMeme
