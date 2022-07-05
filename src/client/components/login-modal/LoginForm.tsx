import React from "react"

const LoginForm = () => {
  return (
    <form action="/login" className="h-full p-4 pt-2 pl-0 flex flex-col">
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Email..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="first-name"
        placeholder="Password..."
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-xl text-white h-14 mt-8"
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
