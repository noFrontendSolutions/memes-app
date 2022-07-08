import React from "react"

const LoginInputs = ({
  credentials,
  setCredentials,
  error,
}: {
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>
  error: any
}) => {
  return (
    <>
      {" "}
      <label htmlFor="email" className="font-bold">
        Email:
      </label>
      <input
        type="text"
        name="email"
        placeholder="Email..."
        value={credentials?.email ? credentials?.email : ""}
        className="custom-input"
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
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {error?.password && (
        <p className="mb-2 text-red-500 font-bold">{error?.password}</p>
      )}
    </>
  )
}

export default LoginInputs

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}
