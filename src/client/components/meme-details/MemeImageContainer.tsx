import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const MemeImageContainer = ({
  memeStats,
  id,
}: {
  memeStats: any
  id: number
}) => {
  const { urls } = useContext(UserContext)

  return (
    <>
      <div className="bg-emerald-400 text-white p-2 flex justify-between items-center">
        {memeStats.title} by {memeStats.user_name}{" "}
        <span className="text-sm">{memeStats.created_at.substr(0, 10)}</span>
      </div>
      <img
        src={`${urls.memeImage}/${id}`}
        className="object-contain max-h-screen"
      />
    </>
  )
}

export default MemeImageContainer
