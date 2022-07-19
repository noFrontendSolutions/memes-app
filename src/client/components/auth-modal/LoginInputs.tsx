import React from "react"
import ErrorDisplay from "../ErrorDisplay"

const LoginInputs = ({
  credentials,
  setCredentials,
  error,
  setError,
}: {
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>
  error: any
  setError: React.Dispatch<React.SetStateAction<any>>
}) => {
  return (
    <>
      {" "}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        value={credentials?.email ? credentials?.email : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      {error?.email && (
        <ErrorDisplay errorMessage={error.email} setError={setError} />
      )}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="first-name"
        value={credentials?.password ? credentials?.password : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {error?.password && (
        <ErrorDisplay errorMessage={error.password} setError={setError} />
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
  avatar_url?: string
  avatar?: File | null
}
