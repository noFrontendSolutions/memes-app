import React from "react"

const SignUpInputs = ({
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
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        name="first-name"
        placeholder="First Name..."
        value={credentials?.first_name ? credentials?.first_name : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, first_name: e.target.value })
        }
      />
      {error?.first_name && (
        <p className="mb-2 text-red-400">{error?.first_name}</p>
      )}
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        name="last-name"
        placeholder="Last Name..."
        value={credentials?.last_name ? credentials?.last_name : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, last_name: e.target.value })
        }
      />
      {error?.last_name && (
        <p className="mb-2 text-red-400">{error?.last_name}</p>
      )}
      <label htmlFor="email">Email:</label>
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
      {error?.email && <p className="mb-2 text-red-400">{error?.email}</p>}
      <label htmlFor="password">Password:</label>
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
        <p className="mb-2 text-red-400">{error?.password}</p>
      )}
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirm-password"
        placeholder="Confirm-Password..."
        value={
          credentials?.password_confirmation
            ? credentials?.password_confirmation
            : ""
        }
        className="custom-input"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password_confirmation: e.target.value,
          })
        }
      />
    </>
  )
}

export default SignUpInputs

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}
