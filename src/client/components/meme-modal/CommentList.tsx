import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"

const CommentList = ({ memeStats }: { memeStats: any }) => {
  const { urls } = useContext(UserContext)

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
