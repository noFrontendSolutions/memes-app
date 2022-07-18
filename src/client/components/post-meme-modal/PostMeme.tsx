import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

const PostMeme = () => {
  const [memeFile, setMemeFile] = useState<File>(null)
  const [memeTitle, setMemeTitle] = useState("")
  const [success, setSuccess] = useState(false)
  const [fileError, setFileError] = useState("")
  const [titleError, setTitleError] = useState("")
  const {
    isLoading,
    setIsLoading,
    postMemeModalIsOpen,
    setPostMemeModalIsOpen,
    setCredentials,
    credentials,
    bearerToken,
    error,
    setError,
    urls,
  } = useContext(UserContext)

  const onSubmit = async () => {
    setError(null)
    setIsLoading(true)
    if (validateFileFormat(memeFile, setFileError, setIsLoading) === false)
      return
    if (!memeTitle) {
      setTitleError(
        "Error: Please chose a title for the Meme you want to post."
      )
      return
    }
    let formData = new FormData()
    formData.append("user_id", credentials.id)
    formData.append("title", memeTitle)
    formData.append("meme", memeFile)
    formData.append(
      "user_name",
      `${credentials.first_name} ${credentials.last_name}`
    )
    try {
      const response = await fetch(urls.postMeme, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        setError({
          ...error,
          message: "Ooops! Something went wrong. Please try again later...",
        })
      }
      setMemeTitle("")
      setMemeFile(null)
    } catch (error) {
      setError({ message: error })
    } finally {
      setSuccess(true)
      setIsLoading(false)
      setTitleError("")
    }
  }

  return (
    <>
      {postMemeModalIsOpen && (
        <>
          <div
            onClick={() => {
              setPostMemeModalIsOpen(!postMemeModalIsOpen)
            }}
            className="fixed z-20 inset-x-0 inset-y-0 h-screen w-screen opacity-25 bg-slate-300"
          ></div>
          <div className="px-4 py-4 fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-1/2 xl:w-1/4 bg-slate-800 text-slate-400 rounded-lg">
            <label htmlFor="meme-title">Meme Title:</label>
            <input
              type="text"
              name="meme-title"
              value={memeTitle ? memeTitle : ""}
              className="custom-input"
              onChange={(e) => setMemeTitle(e.target.value)}
            />
            {titleError &&
              setTimeout(() => {
                setTitleError("")
              }, 5000) && (
                <p className="mx-2 text-red-500 font-bold text-center">
                  {titleError}
                </p>
              )}
            <div className="flex items-center ">
              <label
                htmlFor="avatar-image"
                className="w-[60%] cursor-pointer flex flex-row justify-center items-center p-2 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
              >
                Select Meme File
                <input
                  id="avatar-image"
                  title="Chose Avatar Image..."
                  onChange={(e) => {
                    setMemeFile(e.target.files[0])
                  }}
                  type="file"
                  className="hidden"
                />
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-8 w-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
              </label>
              {memeFile ? (
                <span className="ml-2 p-2 w-[40%] text-center bg-slate-900 rounded">
                  {memeFile.name}
                </span>
              ) : (
                <span className="ml-2 p-2 w-[40%] text-center bg-slate-900 rounded">
                  None Chosen
                </span>
              )}
            </div>
            {fileError &&
              setTimeout(() => {
                setFileError("")
              }, 5000) && (
                <p className="mt-2 text-red-500 font-bold text-center">
                  {fileError}
                </p>
              )}
            <button
              type="submit"
              className="w-full bg-emerald-500 rounded-lg hover:bg-emerald-600 font-bold text-slate-200 text-xl h-14 mt-8 flex justify-center items-center"
              onClick={() => onSubmit()}
            >
              {!isLoading && <span>Submit</span>}
              {isLoading && (
                <span>
                  <svg
                    role="status"
                    className="w-8 h-8 mr-2 text-red-700 animate-spin fill-red-900"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </span>
              )}
            </button>
            {error?.message &&
              setTimeout(() => {
                setError({ ...error, message: "" })
              }, 5000) && (
                <p className="mt-2 text-red-500 font-bold text-center">
                  {error.message}
                </p>
              )}
            {!error?.message &&
              setTimeout(() => {
                setSuccess(false)
              }, 5000) && (
                <p className="mt-2 text-emerald-400 text-center">
                  {success && "Upload Successful!"}
                </p>
              )}
          </div>
        </>
      )}
    </>
  )
}

export default PostMeme

function validateFileFormat(file: File, setFileError: any, setIsLoading: any) {
  if (!file) {
    setFileError(
      "Error: You have to choose an Image file before you cklick on submit."
    )
    setIsLoading(false)
    return false
  }
  const fileExtension = file.name.split(".").pop()
  const allowedExtensions = /jpg|jpeg|png|svg/
  if (!allowedExtensions.test(fileExtension)) {
    setFileError("Error: Wrong File extension. Use either JPG, PNG, or SVG.")
    setIsLoading(false)
    return false
  } else if (file?.size >= 100000) {
    setFileError("Error: File size too big. File should be no more than 100kb.")
    setIsLoading(false)
    return false
  }
  setIsLoading(false)
  return true
}
