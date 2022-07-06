import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useState,
} from "react"

export const UserContext = createContext<UserContextState>({
  loggedIn: false,
  setLoggedIn: null,
  loginModalIsOpen: false,
  setLoginModalIsOpen: null,
  credentials: null,
  setCredentials: null,
  isLoading: false,
  setIsLoading: null,
  error: null,
  setError: null,
})

const UserContextProvider = ({ children }: ChildrenProps) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

interface ChildrenProps {
  children: ReactChild | ReactChildren
}

interface UserContextState {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null
  loginModalIsOpen: boolean | null
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>> | null
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null
  error: any
  setError: React.Dispatch<React.SetStateAction<any>> | null
}

interface Credentials {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}
