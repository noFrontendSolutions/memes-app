import React, { useEffect, useState } from "react"

interface Credentials {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmedPassword: string
}

const signUp = async (url: string, credentials: Credentials) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(credentials),
  })
  const data = await response.json()
  console.log(data)
}

const SignUpForm = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null)

  return (
    <form action="/login" className="h-full p-4 pt-2 pl-0 flex flex-col">
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        name="first-name"
        placeholder="First Name..."
        className="rounded w-full mb-4 mt-2  py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, firstName: e.target.value })
        }
      />
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        name="last-name"
        placeholder="Last Name..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, lastName: e.target.value })
        }
      />
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
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirm-password"
        placeholder="Confirm-Password..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, confirmedPassword: e.target.value })
        }
      />
      <button
        type="submit"
        className="bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-white text-xl h-14 mt-8"
        onClick={(e) => {
          e.preventDefault()
          signUp("http://localhost:8000/api/sign-up", credentials)
        }}
      >
        Sign Up
      </button>
    </form>
  )
}

export default SignUpForm
