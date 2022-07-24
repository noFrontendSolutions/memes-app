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
  //const [isLover, setIsLover] = useState(false)
  //const [isHater, setIsHater] = useState(false)

  //*************************************************************** */

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
    if (loggedIn) {
      ;(async () => {
        const { data, error } = await fetchMemeData()
        //below should always return an array with exactly one element; therefore unique
        const stats = data.stats.filter((stat: any) => {
          return stat.user_id === parseInt(credentials.id)
        })
        setUserPreferences(stats[0])
        setMemeStats(data)
        setError(error)
      })()
    }
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
    </div>
  )
}

export default DetailsContainer
