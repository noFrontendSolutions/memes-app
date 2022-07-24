import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import MemeContainer from "./meme-modal/MemeImageContainer"

const MemePreview = ({
  id,
  setShowMemeDetailsPage,
  setChosenMemeId,
  setMemeStats,
  memeInfo,
}: {
  id: number
  setShowMemeDetailsPage: React.Dispatch<React.SetStateAction<boolean>>
  setChosenMemeId: React.Dispatch<React.SetStateAction<number>>
  setMemeStats: React.Dispatch<React.SetStateAction<any>>
  memeInfo: MemeInfo
}) => {
  const { urls } = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMemeData = async () => {
    setIsLoading(true)
    let error: any = null
    let data = []
    try {
      const response = await fetch(`${urls.memeStats}/${id}`)
      data = await response.json()
      if (!response.ok) throw new Error("Ooops! Something went wrong!")
    } catch (error) {
      error = error
      setError(error)
    } finally {
      setIsLoading(false)
    }
    return { data, error }
  }

  return (
    <div
      onClick={async () => {
        setShowMemeDetailsPage(true)
        setChosenMemeId(id)
        setIsLoading(true)
        const { data, error } = await fetchMemeData()
        setIsLoading(false)
        setMemeStats(data)
      }}
      className="transition ease-in-out hover:-translate-y-1 hover:scale-125 bg-slate-900 cursor-pointer flex flex-col hover:border hover:border-emerald-400 rounded-lg"
    >
      <div className="bg-slate-900 p-2 text-center text-lg text-emerald-400 rounded-lg">
        {memeInfo.title}
      </div>

      <img
        src={`${urls.memeImage}/${id}`}
        className="object-contain h-[433px] w-full"
      />
    </div>
  )
}

export default MemePreview

interface MemeInfo {
  id: number
  title: string
  likes: number
  dislikes: number
  meme_url: string
  user_id: string
  user_name: string
}
