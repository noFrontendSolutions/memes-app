import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"

const SignUpForm = () => {
  /* const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null) */
  const {
    loggedIn,
    setLoggedIn,
    loginModalIsOpen,
    setLoginModalIsOpen,
    credentials,
    setCredentials,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useContext(UserContext)

  return (
    <form action="/login" className="h-full p-4 pt-2 pl-0 flex flex-col">
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        name="first-name"
        placeholder="First Name..."
        className="rounded w-full mb-4 mt-2  py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, first_name: e.target.value })
        }
      />
      {error?.first_name && (
        <p className="mb-2 text-red-500 font-bold">{error?.first_name}</p>
      )}
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        name="last-name"
        placeholder="Last Name..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, last_name: e.target.value })
        }
      />
      {error?.last_name && (
        <p className="mb-2 text-red-500 font-bold">{error?.last_name}</p>
      )}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Email..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      {error?.email && (
        <p className="mb-2 text-red-500 font-bold">{error?.email}</p>
      )}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="first-name"
        placeholder="Password..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {error?.password && (
        <p className="mb-2 text-red-500 font-bold">{error?.password}</p>
      )}
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirm-password"
        placeholder="Confirm-Password..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password_confirmation: e.target.value,
          })
        }
      />
      <button
        type="submit"
        className="bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-white text-xl h-14 mt-8"
        onClick={async (e) => {
          e.preventDefault()
          signUp(
            "http://127.0.0.1:8000/api/sign-up",
            setLoggedIn,
            credentials,
            setCredentials,
            isLoading,
            setIsLoading,
            error,
            setError,
            setLoginModalIsOpen
          )
        }}
      >
        Sign Up
      </button>
    </form>
  )
}

interface Credentials {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

const signUp = async (
  url: string,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  credentials: Credentials,
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>,
  isLoading = true,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  error: any,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if (response.ok) {
      setCredentials({ ...data.user })
      setLoggedIn(true)
      setLoginModalIsOpen(false)
    } else {
      console.log(data.errors)
      setError({ ...data.errors })
    }
  } catch (error) {
    console.log(error)
    setError(error)
  } finally {
    setIsLoading(false)
  }
}

export default SignUpForm
