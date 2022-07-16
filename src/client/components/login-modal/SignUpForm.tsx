import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import SignUpInputs from "./SingnUpInputs"

const SignUpForm = () => {
  const {
    setLoggedIn,
    setBearerToken,
    setLoginModalIsOpen,
    credentials,
    setCredentials,
    isLoading,
    setIsLoading,
    error,
    setError,
    urls,
  } = useContext(UserContext)

  return (
    <form action="/login" className="h-full pt-2 pl-0 flex flex-col">
      <SignUpInputs
        credentials={credentials}
        setCredentials={setCredentials}
        error={error}
      />
      <button
        type="submit"
        className="bg-emerald-500 rounded-lg hover:bg-emerald-600 font-bold text-slate-200 text-xl h-14 mt-8 flex justify-center items-center"
        onClick={async (e) => {
          e.preventDefault()
          signUp(
            urls.signUp,
            setLoggedIn,
            setBearerToken,
            credentials,
            setCredentials,
            setIsLoading,
            error,
            setError,
            setLoginModalIsOpen
          )
        }}
      >
        {!isLoading && <span>Sign Up</span>}
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
      {error?.message &&
        setTimeout(() => {
          setError({ ...error, message: "" })
        }, 5000) && (
          <p className="mt-2 text-red-500 font-bold">{error?.message}</p>
        )}
    </form>
  )
}

export default SignUpForm

//******************************************************************* */
//**************************Helper Functions************************** */
//******************************************************************* */

const signUp = async (
  url: string,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setBearerToken: React.Dispatch<React.SetStateAction<string>>,
  credentials: Credentials,
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  error: any,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)
  setIsLoading(true)
  if (validateSignUp(credentials, error, setError) === false) {
    setIsLoading(false)
    return
  }
  let formData = new FormData()
  if (credentials.avatar) {
    formData.append("first_name", credentials.first_name)
    formData.append("last_name", credentials.last_name)
    formData.append("email", credentials.email)
    formData.append("password", credentials.password)
    formData.append("avatar", credentials.avatar)
  } else {
    formData.append("first_name", credentials.first_name)
    formData.append("last_name", credentials.last_name)
    formData.append("email", credentials.email)
    formData.append("password", credentials.password)
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      setCredentials({ ...data.user })
      setBearerToken(data.token)
      localStorage.setItem("bearerToken", data.token)
      localStorage.setItem("id", data.user.id)
      localStorage.setItem("first_name", data.user.first_name)
      localStorage.setItem("last_name", data.user.last_name)
      localStorage.setItem("email", data.user.email)
      localStorage.setItem("avatar_url", data.user.avatar_url)
      setLoggedIn(true)
      setLoginModalIsOpen(false)
    } else {
      if (data.error) {
        setError({ message: data.message })
      } else {
        throw new Error(
          "Ooops! Something went wrong. Please try again later..."
        )
      }
    }
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false)
  }
}

const validateSignUp = (
  credentials: Credentials,
  error: any,
  setError: React.Dispatch<React.SetStateAction<any>>
) => {
  let everythingCorrect = true
  let emailError = ""
  let passwordError = ""
  let firstNameError = ""
  let lastNameError = ""
  let confirmationError = ""
  if (!credentials?.first_name) {
    firstNameError = "Error: First Name field is mandatory!"
    everythingCorrect = false
  }
  if (!credentials?.last_name) {
    lastNameError = "Error: Last Name field is mandatory!"
    everythingCorrect = false
  }

  if (!credentials?.email) {
    emailError = "Error: Email field is mandatory!"
    everythingCorrect = false
  }
  if (!credentials?.password) {
    passwordError = "Error: Password field is mandatory!"
    everythingCorrect = false
  }
  if (credentials?.password !== credentials?.password_confirmation) {
    confirmationError = "Error: Confirmed Password does not match Password!"
  }
  setError({
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    password: passwordError,
    confirmation: confirmationError,
  })
  return everythingCorrect
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
