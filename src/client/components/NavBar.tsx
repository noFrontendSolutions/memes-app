import React, { ReactChild, ReactChildren, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useLocation } from "react-router-dom"
import FormContainer from "./auth-modal/FormContainer"
import UsersContainer from "./user-modal/UsersContainer"
import defaultAvatar from "../../../static-assets/default-avatar.png"
import PostMeme from "./post-meme-modal/PostMeme"
import { ModalContext } from "../context/ModalContext"

const NavBar = ({ children }: { children: ReactChild | ReactChildren }) => {
  const location = useLocation()
  const {
    loginModalIsOpen,
    setLoginModalIsOpen,
    userModalIsOpen,
    setUserModalIsOpen,
    postMemeModalIsOpen,
    setPostMemeModalIsOpen,
  } = useContext(ModalContext)

  const { setCredentials, loggedIn, credentials } = useContext(UserContext)

  return (
    <>
      {postMemeModalIsOpen && <PostMeme />}
      {userModalIsOpen && <UsersContainer />}
      {loginModalIsOpen && <FormContainer />}
      <div className="h-20 px-2 sm:px8 flex flex-row justify-end items-center bg-slate-800 font-titillium text-slate-400 font-semibold">
        <div className="flex flex-row items-center justify-around sm:justify-start h-full w-full mr-4 sm:mr-8">
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "mx-2 sm:mr-14 border-b-2 border-slate-400 transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                : "mx-2 sm:mr-14 text-slate-400 font-semibold transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            }
          >
            Home
          </Link>
          <Link
            to="/meme-creator"
            className={
              location.pathname === "/meme-creator"
                ? "mx-2 sm:mr-14 border-b-2 border-slate-400 transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                : "mx-2 sm:mr-14 text-slate-400 font-semibold transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            }
          >
            Create Meme
          </Link>
          {loggedIn && (
            <button
              className="cursor-pointer flex flex-row justify-center items-center ml-2 sm:ml-10 xl:ml-20 p-2 w-32 sm:w-52 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
              onClick={() => setPostMemeModalIsOpen(!postMemeModalIsOpen)}
            >
              Post Meme
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 sm:ml-4 h-4 w-4 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          )}
        </div>

        {loggedIn && (
          <>
            <div className="hidden sm:visible sm:flex sm:items-center">
              <span className="mr-4 w-36 text-right text-slate-400">
                Logged in as:
              </span>
              <div className="mr-4 p-4 h-10 bg-slate-900 rounded-lg text-emerald-400 flex justify-center items-center">
                {credentials?.email}
              </div>
            </div>
          </>
        )}

        {!loggedIn && (
          <button
            onClick={() => {
              setLoginModalIsOpen(!loginModalIsOpen)
              setCredentials(null)
            }}
            className="h-14 w-44 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300 flex justify-center items-center"
          >
            <span>Login / Sign Up</span>
          </button>
        )}
        {loggedIn && (
          <>
            <img
              src={
                localStorage.getItem("avatar_url") === "default"
                  ? defaultAvatar
                  : localStorage.getItem("avatar_url")
              }
              className="object-fill h-14 w-14 rounded-full cursor-pointer border border-slate-800 hover:border-emerald-300"
              onClick={() => {
                setUserModalIsOpen(!userModalIsOpen)
              }}
            />
          </>
        )}
      </div>
      {children}
    </>
  )
}

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

export default NavBar
