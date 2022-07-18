import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

const UsersContainer = () => {
  const { userModalIsOpen, setUserModalIsOpen, setCredentials, setLoggedIn } =
    useContext(UserContext)

  return (
    <>
      <div
        onClick={() => setUserModalIsOpen(false)}
        className="fixed z-20 h-screen w-screen opacity-25 bg-slate-400 font-titillium"
      ></div>
      <div className="p-4 absolute z-30 top-20 right-0 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] bg-slate-800 text-slate-400">
        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-col bg-slate-900 w-full p-2 rounded-lg">
            <button
              onClick={() => {}}
              className="my-2 h-14 w-full  text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300 flex justify-center items-center"
            >
              {<span className="">Coming Soon...</span>}
            </button>
            <button
              onClick={() => {}}
              className="my-2 h-14 w-full  border text-red-400 border-red-400 rounded hover:text-red-300 hover:border-red-300 flex justify-center items-center"
            >
              {<span className="">Comig Soon...</span>}
            </button>
            <button
              onClick={() => {}}
              className="my-2 h-14 w-full text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300  flex justify-center items-center"
            >
              {<span>Coming Soon...</span>}
            </button>
          </div>

          <button
            onClick={() => {
              window.localStorage.clear()
              setUserModalIsOpen(false)
              setCredentials(null)
              setLoggedIn(false)
            }}
            className="h-14 w-full mt-4 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300 flex justify-center items-center"
          >
            {<span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}

export default UsersContainer

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  avatar_url?: string
  avatar?: File | null
}
