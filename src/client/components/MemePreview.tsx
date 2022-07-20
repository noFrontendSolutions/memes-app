import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

const MemePreview = ({
  id,
  setShowMemeDetailsPage,
  setChosenMemeId,
  setMemeStats,
}: {
  id: number
  setShowMemeDetailsPage: React.Dispatch<React.SetStateAction<boolean>>
  setChosenMemeId: React.Dispatch<React.SetStateAction<number>>
  setMemeStats: React.Dispatch<React.SetStateAction<any>>
}) => {
  const { urls } = useContext(UserContext)

  //const [memeStats, setMemeStats] = useState(null)
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
      className="transition ease-in-out delay-150 h-64 w-64 hover:-translate-y-1 hover:scale-125 bg-slate-900 cursor-pointer"
    >
      <img
        src={`${urls.memeImage}/${id}`}
        className="h-full w-full object-contain border-2"
      />
    </div>
  )
}

export default MemePreview
