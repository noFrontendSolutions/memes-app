import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

const Modal = () => {
  const { setLoginModalIsOpen, setCredentials, setError } =
    useContext(UserContext)
  const [chooseLogin, setChooseLogin] = useState(true)

  return (
    <>
      <div
        onClick={() => setLoginModalIsOpen(false)}
        className="fixed z-20 h-screen w-screen opacity-25 bg-slate-400 font-titillium"
      ></div>
      <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] bg-slate-800 text-slate-400">
        <div className="h-full border border-emerald-400 rounded p-4 flex flex-col">
          <div className="w-full flex flex-row justify-between items-center">
            <button
              onClick={() => {
                setChooseLogin(true)
                setCredentials(null)
                setError(null)
              }}
              className={
                chooseLogin
                  ? "border-b-2 border-emerald-400 text-emerald-400 text-lg transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  : " text-slate-400 text-lg transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
              }
            >
              Login
            </button>
            <span className="text-slate-400 font-bold">OR</span>
            <button
              onClick={() => {
                setChooseLogin(false)
                setCredentials(null)
                setError(null)
              }}
              className={
                !chooseLogin
                  ? "border-b-2 border-emerald-400 text-emerald-400 text-lg transition transform hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  : "text-slate-400 text-lg transition transform hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
              }
            >
              Sign Up
            </button>
          </div>
          <div className="h-0 border border-slate-400 my-4"></div>
          {!chooseLogin && <SignUpForm />}
          {chooseLogin && <LoginForm />}
        </div>
      </div>
    </>
  )
}

export default Modal
