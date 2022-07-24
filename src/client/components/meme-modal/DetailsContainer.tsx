import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"
import ErrorDisplay from "../ErrorDisplay"
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"
import LikesContainer from "./LikesContainer"
import MemeImageContainer from "./MemeImageContainer"

const DetailsContainer = ({
  id,
  memeStats,
  setShowMemeDetailsComponent,
  setMemeStats,
}: {
  id: number
  memeStats: any
  setShowMemeDetailsComponent: React.Dispatch<React.SetStateAction<boolean>>
  setMemeStats: React.Dispatch<React.SetStateAction<any>>
}) => {
  const { urls, loggedIn, credentials, error, setError } =
    useContext(UserContext)
  const { setLoginModalIsOpen } = useContext(ModalContext)
  const [memeComment, setMemeComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [userPreferences, setUserPreferences] = useState([])

  const sendComment = async () => {
    if (!memeComment) return
    setIsLoading(true)
    if (!loggedIn) {
      setShowMemeDetailsComponent(false)
      setLoginModalIsOpen(true)
      return
    }
    try {
      const response = await fetch(urls.postComment, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          content: memeComment,
          user_name: `${credentials.first_name} ${credentials.last_name}`,
          user_id: credentials.id,
          meme_id: id,
        }),
      })
      if (!response.ok) {
        setError({
          ...error,
          message: "Ooops! Something went wrong. Please try again later...",
        })
      }
      const answer = await response.json()
      setRefetch(!refetch)
    } catch (error) {
      setError({ message: error })
    } finally {
      setIsLoading(false)
      setMemeComment("")
    }
  }

  const fetchMemeData = async () => {
    let error: any = null
    let data = []
    try {
      const response = await fetch(`${urls.memeStats}/${id}`)
      data = await response.json()
      if (!response.ok) throw new Error("Ooops! Something went wrong!")
    } catch (error) {
      error = error
    } finally {
    }
    return { data, error }
  }

  useEffect(() => {
    setIsLoading(true)
    if (loggedIn) {
      ;(async () => {
        const { data, error } = await fetchMemeData()
        //below should always return an array with exactly one element or an empty array, if a user hasn't voted on a meme, yet;
        const stats = data.stats.filter((stat: any) => {
          return stat.user_id === parseInt(credentials.id)
        })
        setUserPreferences(stats[0])
        setMemeStats(data)
        setError(error)
      })()
    } else {
      ;(async () => {
        const { data, error } = await fetchMemeData()
        setMemeStats(data)
        setError(error)
      })()
    }
    setIsLoading(false)
  }, [refetch, loggedIn])

  return (
    <div className="fixed z-30 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full lg:w-1/2  bg-black text-slate-300 max-h-[100vh] overflow-y-auto rounded-lg">
      {memeStats && (
        <div className="bg-black text-slate-300 flex flex-col ">
          <MemeImageContainer id={id} memeStats={memeStats} />
          <LikesContainer
            memeStats={memeStats}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
            refetch={refetch}
            setRefetch={setRefetch}
            setMemeStats={setMemeStats}
            setError={setError}
            id={id}
          />
          <div className="h-4 bg-black"></div>
          <CommentInput
            memeComment={memeComment}
            setMemeComment={setMemeComment}
            sendComment={sendComment}
            isLoading={isLoading}
          />
          {error?.message && (
            <ErrorDisplay errorMessage={error.message} setError={setError} />
          )}
          <h3 className="py-2 text-center bg-slate-900">Comments:</h3>
          <div className="h-4 bg-black"></div>
          <div className="bg-black flex flex-col">
            <CommentList memeStats={memeStats} />
          </div>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-24 h-24 text-emerald-300 animate-spin  fill-emerald-600"
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
        </div>
      )}
    </div>
  )
}

export default DetailsContainer
