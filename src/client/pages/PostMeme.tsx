import React, { useContext, useState } from "react"

import { UserContext } from "../context/UserContext"

const PostMeme = () => {
  const [memeTitle, setMemeTitle] = useState("")
  const [memeFile, setMemeFile] = useState(null)
  const { credentials, bearerToken } = useContext(UserContext)

  const onSubmit = async () => {
    let formData = new FormData()
    formData.append("user_id", credentials.id)
    formData.append("title", memeTitle)
    formData.append("meme", memeFile)
    formData.append(
      "user_name",
      `${credentials.first_name} ${credentials.last_name}`
    )
    const response = await fetch("http://localhost:3000/users/post-meme", {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
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
