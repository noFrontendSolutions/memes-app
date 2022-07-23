import React, { useState } from "react"

const LikesContainer = ({
  memeStats,
  setMemeStats,
}: {
  memeStats: any
  setMemeStats: React.Dispatch<React.SetStateAction<any>>
}) => {
  const [isLover, setIsLover] = useState(false)
  const [isHater, setIsHater] = useState(false)

  const onLike = () => {
    if (!isLover) {
      setIsLover(true)
      setIsHater(false)
      return
    }
    if (isHater) {
      setIsLover(true)
      setIsHater(false)
      return
    }
    setIsLover(false)
    return
  }

  const onDislike = () => {
    if (!isHater) {
      setIsLover(false)
      setIsHater(true)
      return
    }
    if (isLover) {
      setIsLover(false)
      setIsHater(true)
      return
    }
    setIsHater(false)
    return
  }

  return (
    <div className="bg-slate-800 p-2 text-center text-lg flex items-center justify-center">
      <p className="text-sm text-emerald-400 mr-2">Love It</p>
      <svg
        onClick={() => onLike()}
        className={
          isLover
            ? "w-8 h-8 p-[5px] text-emerald-400 bg-black rounded-full cursor-pointer border-2 border-emerald-400"
            : "w-8 h-8 p-[5px] text-emerald-400 bg-black rounded-full cursor-pointer"
        }
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
        onClick={() => onDislike()}
        className={
          isHater
            ? "w-8 h-8 p-[5px] text-emerald-400 bg-black rounded-full cursor-pointer border-2 border-emerald-400"
            : "w-8 h-8 p-[5px] text-emerald-400 bg-black rounded-full cursor-pointer"
        }
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
  )
}

export default LikesContainer
