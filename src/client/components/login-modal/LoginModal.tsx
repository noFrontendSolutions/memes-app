import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

const LoginModal = () => {
  const { loginModalIsOpen, setLoginModalIsOpen, setCredentials } =
    useContext(UserContext)
  const [chooseLogin, setChooseLogin] = useState(true)

  return (
    <>
      <div
        onClick={() => setLoginModalIsOpen(false)}
        className="fixed z-20 h-screen w-screen opacity-25 bg-slate-300"
      ></div>
      <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 bg-white text-gray-700">
        <div className="h-full border-2 border-blue-700 rounded p-4 flex flex-col">
          <div className="w-full flex flex-row justify-between items-center">
            <button
              onClick={() => {
                setChooseLogin(true)
                setCredentials(null)
              }}
              className={
                chooseLogin
                  ? "font-bold border-b-2 border-blue-700 text-blue-600 text-lg transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  : "font-bold text-gray-700 text-lg transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
              }
            >
              Login
            </button>
            <span className="text-gray-700 font-bold">OR</span>
            <button
              onClick={() => {
                setChooseLogin(false)
                setCredentials(null)
              }}
              className={
                !chooseLogin
                  ? "font-bold border-b-2 border-blue-700 text-blue-600 text-lg transition transform hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  : "font-bold text-gray-700 text-lg transition transform hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
              }
            >
              Sign Up
            </button>
          </div>
          <div className="h-0 border-2 my-4"></div>
          {!chooseLogin && <SignUpForm />}
          {chooseLogin && <LoginForm />}
        </div>
      </div>
    </>
  )
}

export default LoginModal
