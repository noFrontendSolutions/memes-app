import React, { ReactChild, ReactChildren, useContext } from "react"
import { UserContext } from "../context/UserContext"
import LoginModal from "./login-modal/LoginModal"

interface NavBarProps {
  children: ReactChild | ReactChildren
}

const NavBar = ({ children }: NavBarProps) => {
  const {
    loginModalIsOpen,
    setLoginModalIsOpen,
    loggedIn,
    credentials,
    bearerToken,
  } = useContext(UserContext)

  return (
    <>
      {loginModalIsOpen && <LoginModal />}
      <div className="h-20 px-4 flex flex-row justify-end items-center bg-blue-100">
        {loggedIn && <div className="mr-4">{credentials.email}</div>}
        {!loggedIn && (
          <button
            onClick={() => setLoginModalIsOpen(!loginModalIsOpen)}
            className="h-14 w-36 bg-blue-500 border-8 border-blue-400 rounded-lg text-blue-50 font-bold hover:bg-blue-600 hover:text-white"
          >
            Login/SignUp
          </button>
        )}
        {loggedIn && (
          <button
            onClick={() => {}}
            className="h-14 w-36 bg-blue-500 border-8 border-blue-400 rounded-lg text-blue-50 font-bold hover:bg-blue-600 hover:text-white"
          >
            Logout
          </button>
        )}
      </div>
      {children}
    </>
  )
}

const logout = async (
  url: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)
  const token = window.localStorage.getItem("bearerToken")
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    })
    if (response.ok) {
      window.localStorage.clear()
    } else {
      throw new Error("Oops")
    }
  } catch (error) {
    console.log(error)
  } finally {
    setIsLoading(false)
  }
}

export default NavBar
