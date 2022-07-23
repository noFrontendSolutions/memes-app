import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"
import ErrorDisplay from "../ErrorDisplay"
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"
import LikesContainer from "./LikesContainer"
import MemeContainer from "./MemeContainer"

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
  const [commentUpdate, setCommentUpdate] = useState(null)
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
      setCommentUpdate(answer)
    } catch (error) {
      setError({ message: error })
    } finally {
      setIsLoading(false)
      setMemeComment("")
    }
  }

  useEffect(() => {
    console.log(memeStats)
    let isMounted = true
    return () => {
      isMounted = false
    }
  }, [memeStats])

  return (
    <div className="fixed z-30 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full lg:w-1/2  bg-black text-slate-300 max-h-[100vh] overflow-y-auto rounded-lg">
      {memeStats && (
        <div className="bg-black text-slate-300 flex flex-col ">
          <MemeContainer id={id} memeStats={memeStats} />
          <LikesContainer memeStats={memeStats} setMemeStats={setMemeStats} />
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
            <CommentList
              memeStats={memeStats}
              commentUpdate={commentUpdate}
              setMemeStats={setMemeStats}
              id={id}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailsContainer
