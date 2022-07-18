import React, { ReactChild, ReactChildren, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useLocation } from "react-router-dom"
import FormContainer from "./auth-modal/FormContainer"
import UsersContainer from "./user-modal/UsersContainer"
import defaultAvatar from "../../../static-assets/default-avatar.png"
import PostMeme from "./post-meme-modal/PostMeme"

interface NavBarProps {
  children: ReactChild | ReactChildren
}

const NavBar = ({ children }: NavBarProps) => {
  const location = useLocation()
  const {
    loginModalIsOpen,
    setLoginModalIsOpen,
    userModalIsOpen,
    setUserModalIsOpen,
    postMemeModalIsOpen,
    setPostMemeModalIsOpen,
    setError,
    setCredentials,
    setIsLoading,
    loggedIn,
    credentials,
    isLoading,
    bearerToken,
    setLoggedIn,
    urls,
  } = useContext(UserContext)

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
            {!isLoading && <span>Login / Sign Up</span>}
            {isLoading && (
              <span>
                <svg
                  role="status"
                  className="w-8 h-8 mr-2 text-red-700 animate-spin fill-red-900"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
            )}
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
