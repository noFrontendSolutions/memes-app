import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"

const LikesContainer = ({
  memeStats,
  userPreferences,
  setUserPreferences,
  refetch,
  setRefetch,
  setMemeStats,
  id,
  setError,
}: {
  memeStats: any
  userPreferences: any
  setUserPreferences: any
  refetch: boolean
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>
  setMemeStats: React.Dispatch<React.SetStateAction<any>>
  id: number
  setError: React.Dispatch<React.SetStateAction<any>>
}) => {
  const { urls, bearerToken, credentials, loggedIn } = useContext(UserContext)
  const { setLoginModalIsOpen } = useContext(ModalContext)
  const [isLoading, setIsLoading] = useState(false)
  //console.log(userPreferences)

  const onLike = async () => {
    if (!loggedIn) {
      setLoginModalIsOpen(true)
      return
    }
    setIsLoading(true)
    let dto: Dto = {
      user_id: credentials.id,
      meme_id: id,
      is_lover: 0,
      is_hater: 0,
      likes_increment: 0,
      dislikes_increment: 0,
    }
    if (!userPreferences.is_lover && !userPreferences.is_hater) {
      dto.is_lover = 1
      dto.is_hater = 0
      dto.likes_increment = 1
      dto.dislikes_increment = 0
    }
    if (userPreferences.is_hater && !userPreferences.is_lover) {
      dto.is_lover = 1
      dto.is_hater = 0
      dto.likes_increment = 1
      dto.dislikes_increment = -1
    }
    if (userPreferences.is_lover && !userPreferences.is_hater) {
      dto.is_lover = 0
      dto.is_hater = 0
      dto.likes_increment = -1
      dto.dislikes_increment = 0
    }
    try {
      const response = await fetch(`${urls.likeMeme}/${userPreferences.id}`, {
        headers: {
          Authorization: `bearer ${bearerToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "PUT",
        body: JSON.stringify(dto),
      })
      if (!response.ok) throw new Error("Ooops! Something went wrong!")
      const data = await response.json()
    } catch (error) {
      setError(error)
    } finally {
      setRefetch(!refetch)

      setIsLoading(false)
    }
  }

  const onDislike = async () => {
    if (!loggedIn) {
      setLoginModalIsOpen(true)
      return
    }
    setIsLoading(true)
    let dto: Dto = {
      user_id: credentials.id,
      meme_id: id,
      is_lover: 0,
      is_hater: 0,
      likes_increment: 0,
      dislikes_increment: 0,
    }
    if (!userPreferences.is_lover && !userPreferences.is_hater) {
      dto.is_lover = 0
      dto.is_hater = 1
      dto.likes_increment = 0
      dto.dislikes_increment = 1
    }
    if (userPreferences.is_lover && !userPreferences.is_hater) {
      dto.is_lover = 0
      dto.is_hater = 1
      dto.likes_increment = -1
      dto.dislikes_increment = 1
    }
    if (userPreferences.is_hater && !userPreferences.is_lover) {
      dto.is_lover = 0
      dto.is_hater = 0
      dto.likes_increment = 0
      dto.dislikes_increment = -1
    }
    try {
      const response = await fetch(`${urls.likeMeme}/${userPreferences.id}`, {
        headers: {
          Authorization: `bearer ${bearerToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "PUT",
        body: JSON.stringify(dto),
      })
      if (!response.ok) throw new Error("Ooops! Something went wrong!")
      const data = await response.json()
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
      setRefetch(!refetch)
    }
  }

  useEffect(() => {}, [])

  return (
    <div className="bg-slate-800 p-2 text-center text-lg flex items-center justify-center">
      <p className="text-sm text-emerald-400 mr-2">Love It</p>
      <svg
        onClick={() => onLike()}
        className={
          userPreferences && userPreferences.is_lover
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
        <p className="mr-2 text-emerald-400 ">
          {memeStats.stats.length > 0 &&
          memeStats.likes + memeStats.dislikes > 0
            ? `${Math.ceil(
                (memeStats.likes / (memeStats.likes + memeStats.dislikes)) * 100
              )}%`
            : `0%`}
        </p>
        <p className="text-slate-300">
          {memeStats.stats.length > 0
            ? memeStats.likes + memeStats.dislikes
            : 0}
        </p>
      </span>
      <p className="text-sm text-emerald-400 mr-2">Hate It</p>
      <svg
        onClick={() => onDislike()}
        className={
          userPreferences && userPreferences.is_hater
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

const setDto = (id: string, dto: Dto) => {}

interface Dto {
  user_id: string
  meme_id: number
  is_lover: number
  is_hater: number
  likes_increment: number
  dislikes_increment: number
}
