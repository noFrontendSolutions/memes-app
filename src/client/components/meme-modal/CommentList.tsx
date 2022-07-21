import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"

const CommentList = ({
  memeStats,
  commentUpdate,
  setMemeStats,
  id,
}: {
  memeStats: any
  commentUpdate: any
  setMemeStats: any
  id: number
}) => {
  const { urls } = useContext(UserContext)

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
    ;(async () => {
      const { data, error } = await fetchMemeData()
      setMemeStats(data)
    })()
    0
  }, [commentUpdate])

  return (
    <div className="bg-black flex flex-col">
      {memeStats.comments.map((comment: any) => {
        return (
          <div key={comment.id}>
            <span className="flex">
              {" "}
              <img
                src={`${urls.avatar}/${comment.user_id}`}
                className="w-8 h-8"
              />{" "}
              <span className="bg-slate-900 text-sm  w-full px-2 h-8 flex items-center justify-between text-emerald-400">
                <h4>by {comment.user_name}</h4>
                <h4>{comment.created_at.substr(0, 10)}</h4>
              </span>
            </span>
            <span className="flex">
              {" "}
              <p className="p-2 mb-2 bg-slate-800 break-normal w-full">
                {comment.content}
              </p>
            </span>

            <div className="h-4 bg-black"></div>
          </div>
        )
      })}
    </div>
  )
}

export default CommentList
