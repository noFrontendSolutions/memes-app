import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const LoginForm = () => {
  const {
    setLoggedIn,
    setBearerToken,
    setLoginModalIsOpen,
    credentials,
    setCredentials,
    setIsLoading,
    error,
    setError,
  } = useContext(UserContext)

  return (
    <form action="/login" className="h-full p-4 pt-2 pl-0 flex flex-col">
      <label htmlFor="email" className="font-bold">
        Email:
      </label>
      <input
        type="text"
        name="email"
        placeholder="Email..."
        value={credentials?.email ? credentials?.email : ""}
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      {error?.email && (
        <p className="mb-2 text-red-500 font-bold">{error?.email}</p>
      )}
      <label htmlFor="password" className="font-bold">
        Password:
      </label>
      <input
        type="password"
        name="first-name"
        placeholder="Password..."
        value={credentials?.password ? credentials?.password : ""}
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {error?.password && (
        <p className="mb-2 text-red-500 font-bold">{error?.password}</p>
      )}
      <button
        type="submit"
        className="bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-xl text-white h-14 mt-8"
        onClick={(e) => {
          e.preventDefault()
          login(
            "http://127.0.0.1:8000/api/login",
            setLoggedIn,
            setBearerToken,
            credentials,
            setCredentials,
            setIsLoading,
            setError,
            setLoginModalIsOpen
          )
        }}
      >
        Login
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

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

const login = async (
  url: string,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setBearerToken: React.Dispatch<React.SetStateAction<string>>,
  credentials: Credentials,
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
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
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      setCredentials({ ...data.user })
      setBearerToken(data.token)
      localStorage.setItem("bearerToken", data.token)
      localStorage.setItem("id", credentials.id)
      localStorage.setItem("first_name", credentials.first_name)
      localStorage.setItem("last_name", credentials.last_name)
      localStorage.setItem("email", credentials.email)
      setLoggedIn(true)
      setLoginModalIsOpen(false)
    } else {
      if (data.errors) {
        console.log(data.errors)
        setError({ ...data.errors, message: data.message })
      } else {
        throw new Error("Access denied! Bad Credentials!")
      }
    }
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false)
  }
}

export default LoginForm
