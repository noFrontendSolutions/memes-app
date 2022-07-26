import React, { useContext, useState } from "react"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"

const UsersContainer = () => {
  const { setCredentials, setLoggedIn, loggedIn, credentials } =
    useContext(UserContext)
  const { userModalIsOpen, setUserModalIsOpen } = useContext(ModalContext)

  return (
    <>
      <div
        onClick={() => setUserModalIsOpen(false)}
        className="fixed z-20 h-screen w-screen opacity-25 bg-slate-400 font-titillium"
      ></div>
      <div className="p-4 absolute z-30 top-20 right-0 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] bg-slate-800 text-slate-400">
        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-col bg-slate-900 w-full p-2 rounded-lg">
            {loggedIn && (
              <>
                <div className="sm:hidden flex justify-start items-center">
                  <span className="mr-4 w-36 text-sm text-center text-slate-400">
                    Logged in as:
                  </span>
                  <div className="mr-4 p-4 h-10 bg-black rounded-lg text-emerald-400 flex justify-center items-center">
                    {credentials?.email}
                  </div>
                </div>
              </>
            )}
            <button
              id="remove-active-item"
              title="Remove Activ Element..."
              onClick={() => {}}
              className="flex flex-row justify-center items-center mt-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300"
            >
              {" "}
              User Settings (soon...)
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-4 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </button>

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
