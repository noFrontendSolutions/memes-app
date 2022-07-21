import React, { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"

const MemeContainer = ({ memeStats, id }: { memeStats: any; id: number }) => {
  const { urls } = useContext(UserContext)
  const { setShowMemeDetailsComponent } = useContext(ModalContext)
  return (
    <>
      <div className="bg-black mb-4 p-2 font-bold text-lg rounded-t-lg flex justify-center lg:justify-cemter items-center text-slate-100 lg:hidden">
        <svg
          onClick={() => setShowMemeDetailsComponent(false)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 cursor-pointer rounded-full hover:border hover:border-emerald-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
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

export default MemeContainer
