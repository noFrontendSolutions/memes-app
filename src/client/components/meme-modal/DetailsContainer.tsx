import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"
import ErrorDisplay from "../ErrorDisplay"
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"
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
          <div className="bg-slate-800 p-2 text-center text-lg flex items-center justify-center">
            <p className="text-sm text-emerald-400 mr-2">Love It</p>
            <svg
              className="w-8 h-8 p-[5px] text-emerald-400 bg-black rounded-full cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              ></path>
            </svg>
            <span className="flex bg-black rounded-md mx-6 p-2">
              <p className="mr-2 text-emerald-400 ">87%</p>
              <p className="text-slate-300">(413)</p>
            </span>
            <p className="text-sm text-emerald-400 mr-2">Hate It</p>
            <svg
              className=" w-8 h-8 p-[5px] text-emerald-400 bg-black rounded-full cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
              ></path>
            </svg>
          </div>
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
